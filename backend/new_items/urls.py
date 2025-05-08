from django.urls import path
from .views import new_items_view

urlpatterns = [
    path('', new_items_view, name='new_items'),
]
