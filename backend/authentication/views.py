from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser
import logging

# লগিং কনফিগারেশন
logger = logging.getLogger(__name__)

# রেজিস্টার ইউজার
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # রিকোয়েস্ট বডি থেকে JSON ডেটা পড়া
        except json.JSONDecodeError:
            logger.error("Invalid JSON format")
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        # প্রয়োজনীয় ফিল্ড চেক করা
        try:
            first_name = data['first_name']
            last_name = data['last_name']
            phone_number = data['phone_number']
            email = data['email']
            password = data['password']
        except KeyError as e:
            logger.error(f"Missing parameter: {str(e)}")
            return JsonResponse({"error": f"Missing parameter: {str(e)}"}, status=400)

        # চেক করা হচ্ছে ইউজারের ইমেইল এবং ফোন নাম্বার ডুপ্লিকেট কিনা
        if CustomUser.objects.filter(email=email).exists():
            logger.error(f"Email {email} is already used.")
            return JsonResponse({"error": "This email is already used."}, status=400)

        if CustomUser.objects.filter(phone_number=phone_number).exists():
            logger.error(f"Phone number {phone_number} is already used.")
            return JsonResponse({"error": "This phone number is already used."}, status=400)

        try:
            # নতুন ইউজার তৈরি করা
            user = CustomUser.objects.create_user(
                username=email,  # ইমেইল নাম ব্যবহার করা হচ্ছে ইউজারনেম হিসেবে
                first_name=first_name,
                last_name=last_name,
                phone_number=phone_number,
                email=email,
                password=password
            )
            user.save()
            logger.info(f"User {user.first_name} {user.last_name} registered successfully.")
            return JsonResponse({"message": "User registered successfully!"})
        except Exception as e:
            logger.error(f"Error while creating user: {str(e)}")
            return JsonResponse({"error": "Registration failed"}, status=500)

# ফোন নাম্বার এবং পাসওয়ার্ড দিয়ে লগিন
def authenticate_by_phone(phone_number, password):
    try:
        # ফোন নাম্বার দিয়ে ইউজার খোঁজা
        user = CustomUser.objects.get(phone_number=phone_number)
        if user.check_password(password):
            return user
        return None
    except CustomUser.DoesNotExist:
        return None

# লগিন ইউজার
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            logger.error("Invalid JSON format")
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        try:
            phone_number = data['phone_number']
            password = data['password']
            
            # ফোন নাম্বার এবং পাসওয়ার্ড দিয়ে ইউজার অথেনটিকেশন
            user = authenticate_by_phone(phone_number, password)
            if user is not None:
                login(request, user)
                logger.info(f"User {user.first_name} {user.last_name} logged in successfully.")
                # ইউজারের প্রথম নাম ওয়েলকাম পেজে পাঠাতে পারব
                return JsonResponse({"message": f"Welcome, {user.first_name}!", "user": {"first_name": user.first_name}})
            else:
                logger.error(f"Invalid phone number or password for {phone_number}")
                return JsonResponse({"error": "Invalid phone number or password"}, status=400)
        except KeyError as e:
            logger.error(f"Missing parameter: {str(e)}")
            return JsonResponse({"error": f"Missing parameter: {str(e)}"}, status=400)
