from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({"message": "Welcome to our E-commerce site"})
