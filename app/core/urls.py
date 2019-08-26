from django.urls import path, include

from . import views

urlpatterns = [
    path('gallery/<slug:slug>/', views.gallery),
    path('gallery-content/<slug:slug>/', views.gallery_content),
    path('photo/<slug:slug>/', views.photo_detail),
    path('about/', views.about, name='about'),
    path('page/', views.page, name='page'),
    path('', views.index, name='index')
    # url(r"(?P<slug>[\w-]+)?", views.photo_detail)
]
