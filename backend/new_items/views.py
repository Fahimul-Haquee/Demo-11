from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def new_items_view(request):
    return JsonResponse({"message": "New items selling page"})
