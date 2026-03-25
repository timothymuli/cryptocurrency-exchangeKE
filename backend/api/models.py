from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """wallet row per user — nothing fancy"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    btc = models.DecimalField(max_digits=24, decimal_places=8, default=0)
    eth = models.DecimalField(max_digits=24, decimal_places=8, default=0)
    usdt = models.DecimalField(max_digits=24, decimal_places=8, default=0)
    kes = models.DecimalField(max_digits=24, decimal_places=2, default=0)

    def __str__(self):
        return self.user.username


class Trade(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trades")
    summary = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
