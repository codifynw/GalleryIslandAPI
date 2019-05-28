from django.contrib import admin
from django.urls import path, include

from demo.views import image_upload
from django.views.generic import TemplateView

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('accounts/profile/', include('dashboard.urls')),
    path('leads/', include('leads.urls')),
    path('upload/', image_upload, name='upload'),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='account/signup.html'))

    # path('', allauth.views.signup, name='signup')
]
