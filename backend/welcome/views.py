from django.http import JsonResponse

def welcome_view(request):
    user = request.user
    if user.is_authenticated:
        return JsonResponse({"message": f"Welcome, {user.first_name}!"})
    return JsonResponse({"message": "Welcome, Guest!"})
