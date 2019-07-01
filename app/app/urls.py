from django.contrib import admin
from django.urls import path, include

from core.views import image_upload
from django.views.generic import TemplateView

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('api/', include('api.urls')),
    path('accounts/profile/', include('dashboard.urls')),
    path('accounts/signup/', TemplateView.as_view(template_name='account/signup.html')),
    path('upload/', image_upload, name='upload'),
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    # url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    # path('', allauth.views.signup, name='signup')
]
