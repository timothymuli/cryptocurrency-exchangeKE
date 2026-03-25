from django.contrib import admin
from .models import Profile, Trade


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "btc", "eth", "usdt", "kes")


@admin.register(Trade)
class TradeAdmin(admin.ModelAdmin):
    list_display = ("user", "summary", "created_at")
