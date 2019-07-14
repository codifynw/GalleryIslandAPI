from django.urls import path, include

from . import views

urlpatterns = [
    path('gallery/<slug:slug>/', views.gallery_detail),
    path('photo/<slug:slug>/', views.photo_detail),
    path('', views.index, name='index')
    # url(r"(?P<slug>[\w-]+)?", views.photo_detail)
]
