from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Tool

@receiver(post_save, sender=Tool)
@receiver(post_delete, sender=Tool)
def update_store_capacity(sender, instance, **kwargs):
    # When a Tool is created, updated, or deleted, update the related Store's capacity
    if instance.store:
        instance.store.update_capacity()
