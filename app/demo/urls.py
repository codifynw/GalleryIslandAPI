from django.urls import path, include

from . import views

urlpatterns = [
    path('<slug:slug>/', views.photo_detail),
    path('', views.index, name='index')
    # url(r"(?P<slug>[\w-]+)?", views.photo_detail)
]
