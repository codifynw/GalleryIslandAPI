from django.urls import path, include

from . import views

urlpatterns = [
    path('galleries/<slug:slug>/', views.gallery_detail),
    path('photos/<slug:slug>/', views.photo_detail),
    path('', views.index, name='index')
    # url(r"(?P<slug>[\w-]+)?", views.photo_detail)
]
