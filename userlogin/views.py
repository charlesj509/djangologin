import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout

@csrf_exempt  # only for learning; in production handle CSRF properly
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)

    # Check required fields
    required_fields = ["username", "password", "first_name", "last_name"]
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return JsonResponse(
            {"error": f"Missing required fields: {', '.join(missing_fields)}"},
            status=400
        )

    if User.objects.filter(username=data["username"]).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    if User.objects.filter(email=data["email"]).exists():
        return JsonResponse({"error": "Email already exists"}, status=400)    



   # Create the user
    user = User.objects.create_user(
        username=data["username"],
        email=data.get("email", ""),  # optional
        password=data["password"],
        first_name=data["first_name"],
        last_name=data["last_name"]
    )
    return JsonResponse({"id": user.id, "username": user.username})


@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)

    user = authenticate(
        request,
        username=data["username"],
        password=data["password"]
    )

    if user is None:
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    login(request, user)  # session created here

    return JsonResponse({"message": "Logged in"})


def profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Unauthorized"}, status=401)

    return JsonResponse({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email
    })



def logout_view(request):
    logout(request)  # session destroyed
    return JsonResponse({"message": "Logged out"})
