from django.contrib import admin
from django.urls import path, include

from core.views import image_upload
from django.views.generic import TemplateView

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('accounts/profile/', include('dashboard.urls')),
    path('accounts/signup/', TemplateView.as_view(template_name='account/signup.html')),
    path('upload/', image_upload, name='upload'),
    path('admin/', admin.site.urls),
    path('', include('core.urls'))

    # path('', allauth.views.signup, name='signup')
]
