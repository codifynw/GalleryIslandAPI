from django.contrib import admin
from django.urls import path, include

from demo.views import image_upload

urlpatterns = [
    path('leads/', include('leads.urls')),
    path('upload/', image_upload, name='upload'),
    path('admin/', admin.site.urls),
]
