from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.cache import never_cache


@never_cache
@require_GET
def csrf_token(request):
    return JsonResponse({
        'csrfToken': get_token(request)
    })


def protect_auth_view(view):
    @require_POST
    @csrf_protect
    def protected_view(request, *args, **kwargs):
        return view(request, *args, **kwargs)

    return protected_view