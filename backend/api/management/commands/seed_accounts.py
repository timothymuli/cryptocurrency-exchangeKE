from decimal import Decimal

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from api.models import Profile


class Command(BaseCommand):
    help = "makes the two demo logins if they are missing"

    def handle(self, *args, **options):
        pairs = [
            ("muli", "jianni", "0.001", "0.05", "500", "15000"),
            ("masai", "demo123", "0.002", "0.1", "1000", "25000"),
        ]
        for username, password, btc, eth, usdt, kes in pairs:
            if User.objects.filter(username=username).exists():
                self.stdout.write(f"skip {username}, already there")
                continue
            u = User.objects.create_user(username=username, password=password)
            p = Profile.objects.get(user=u)
            p.btc = Decimal(btc)
            p.eth = Decimal(eth)
            p.usdt = Decimal(usdt)
            p.kes = Decimal(kes)
            p.save()
            self.stdout.write(f"added {username}")
