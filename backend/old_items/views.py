from django.http import JsonResponse

def old_items_view(request):
    return JsonResponse({"message": "Old items selling page"})
