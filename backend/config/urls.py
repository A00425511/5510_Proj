"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.registration.views import RegisterView

from core.auth_views import csrf_token, protect_auth_view


def health(request):
    return JsonResponse({"status": "ok", "from": "django"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health),

    # CSRF protection
    path(
        "api/auth/csrf/",
        csrf_token,
        name="csrf-token",
    ),

    # Protected authentication endpoints
    path(
        "api/auth/login/",
        protect_auth_view(LoginView.as_view()),
        name="protected-login",
    ),
    path(
        "api/auth/logout/",
        protect_auth_view(LogoutView.as_view()),
        name="protected-logout",
    ),
    path(
        "api/auth/registration/",
        protect_auth_view(RegisterView.as_view()),
        name="protected-registration",
    ),

    # Existing API endpoints
    path('api/', include('core.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path(
        'api/auth/registration/',
        include('dj_rest_auth.registration.urls'),
    ),
]
