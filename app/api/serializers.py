from django.contrib.auth.models import User, Group
from core.models import Photo, Gallery, MenuItem
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        fields = ('title', 'caption')
        fields = ('url', 'name')

class GallerySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Gallery
        fields = ('id','title', 'cover_photo', 'slug', 'type')

class FilterLinkListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(visible=True)
        return super(FilterLinkListSerializer, self).to_representation(data)

class GalleryLinkSerializer(serializers.ModelSerializer):
    galleries = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Gallery
        fields = '__all__'
        list_serializer_class = FilterLinkListSerializer

class MenuItemSerializer(serializers.HyperlinkedModelSerializer):
    subGalleries = GalleryLinkSerializer(many=True, read_only=True)

    class Meta:
        model = MenuItem
        fields = '__all__'
