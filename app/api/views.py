from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from core.models import Photo, Gallery, MenuItem
from .serializers import UserSerializer, GroupSerializer, PhotoSerializer, GallerySerializer, MenuItemSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class GalleryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Gallery.objects.all().filter(visible=True)
    serializer_class = GallerySerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
