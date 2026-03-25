# views are a bit long but easier to follow than 5 tiny files
from decimal import Decimal, InvalidOperation

from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import Profile, Trade

# same numbers the React side uses (KES per 1 unit)
RATES = {
    "BTC": Decimal("9000000"),
    "ETH": Decimal("350000"),
    "USDT": Decimal("129"),
    "KES": Decimal("1"),
}


def _balances_dict(profile):
    return {
        "BTC": float(profile.btc),
        "ETH": float(profile.eth),
        "USDT": float(profile.usdt),
        "KES": float(profile.kes),
    }


def _get_field(profile, code):
    return {"BTC": profile.btc, "ETH": profile.eth, "USDT": profile.usdt, "KES": profile.kes}[code]


def _set_field(profile, code, value):
    if code == "BTC":
        profile.btc = value
    elif code == "ETH":
        profile.eth = value
    elif code == "USDT":
        profile.usdt = value
    else:
        profile.kes = value


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = (request.data.get("username") or "").strip()
    password = request.data.get("password") or ""
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"detail": "wrong username or password"}, status=status.HTTP_400_BAD_REQUEST)
    token, _ = Token.objects.get_or_create(user=user)
    profile = user.profile
    return Response(
        {
            "token": token.key,
            "username": user.username,
            "balances": _balances_dict(profile),
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    Token.objects.filter(user=request.user).delete()
    return Response({"ok": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    p = request.user.profile
    return Response({"username": request.user.username, "balances": _balances_dict(p)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def trades_view(request):
    rows = []
    for t in request.user.trades.all()[:200]:
        rows.append(
            {
                "time": t.created_at.strftime("%H:%M:%S"),
                "ans": t.summary,
            }
        )
    return Response(rows)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def convert_view(request):
    fr = request.data.get("from_asset")
    to = request.data.get("to_asset")
    raw_amt = request.data.get("amount")

    if fr not in RATES or to not in RATES:
        return Response({"detail": "bad asset"}, status=400)
    if fr == to:
        return Response({"detail": "pick two different assets"}, status=400)

    try:
        amt = Decimal(str(raw_amt))
    except (InvalidOperation, TypeError):
        return Response({"detail": "bad amount"}, status=400)

    if amt <= 0:
        return Response({"detail": "amount must be positive"}, status=400)

    profile = request.user.profile
    have = _get_field(profile, fr)
    if have < amt:
        return Response({"detail": f"not enough {fr}", "balances": _balances_dict(profile)}, status=400)

    kes = amt if fr == "KES" else amt * RATES[fr]
    out_amt = kes if to == "KES" else kes / RATES[to]

    _set_field(profile, fr, have - amt)
    cur_to = _get_field(profile, to)
    _set_field(profile, to, cur_to + out_amt)
    profile.save()

    out_str = f"{float(out_amt):.6f}"
    summary = f"{amt} {fr} → {out_str} {to}"
    Trade.objects.create(user=request.user, summary=str(summary))

    return Response(
        {
            "message": summary,
            "balances": _balances_dict(profile),
        }
    )
