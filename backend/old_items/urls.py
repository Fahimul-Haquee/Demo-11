from django.urls import path
from .views import old_items_view

urlpatterns = [
    path('', old_items_view, name='old_items'),
]
