from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from app.storage_backends import PublicMediaStorage
from tinymce.models import HTMLField
from slugger import AutoSlugField

class Gallery(models.Model):
    title = models.CharField(max_length=30)
    slug = AutoSlugField(populate_from='title', default="needs-slug", unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    cover_photo = models.ForeignKey('Photo', on_delete=models.CASCADE, default=None, null=True)
    visible = models.BooleanField(default=True)

    MASONRY = 'MA'
    MUSEUM = 'MU'
    GALLERY_TYPE_CHOICES = [
        (MASONRY, 'Masonry'),
        (MUSEUM, 'Museum'),
    ]
    type = models.CharField(
        max_length=2,
        choices=GALLERY_TYPE_CHOICES,
        default=MASONRY,
    )

    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "Galleries"

class Photo(models.Model):
    caption = models.TextField(default="")
    visible = models.BooleanField(default=True)
    galleries = models.ManyToManyField(Gallery, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, default="Untitled")
    file = models.FileField(storage=PublicMediaStorage(), default="")
    slug = AutoSlugField(populate_from='title', default="needs-slug", unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    date_taken = models.DateTimeField(blank=True, null=True)

    def __str__(self):
       return self.title

class Setting(models.Model):
    background = models.ForeignKey(Photo, null=True, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    aboutContent = HTMLField()

    def __str__(self):
       return self.user.username + ' settings'

class MenuItem(models.Model):
    name =  models.CharField(max_length=30)
    url =  models.CharField(max_length=300)
    rank = models.IntegerField(default=9, unique=True)
    subGalleries = models.ManyToManyField(Gallery, blank=True)

    def __str__(self):
       return self.name

class Catalog(models.Model):
    rank = models.IntegerField(default=50, unique=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE)
