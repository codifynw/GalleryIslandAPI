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
    slug = AutoSlugField(populate_from='title', default="needs-slug", unique=True, null=True)
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


class TextField(models.Model):
    className = models.CharField(max_length=50, default="section")
    textContent = HTMLField()

    def __str__(self):
        return self.name

class Section(models.Model):
    name = models.CharField(max_length=128)
    className = models.CharField(max_length=50, default="section")

    def __str__(self):
        return self.name

class SplitSection(models.Model):
    paragraph = HTMLField()
    aboveBannerText = models.CharField(max_length=128)
    bannerText = models.CharField(max_length=128)
    belowBannerText = models.CharField(max_length=128)
    pictureLink = models.FileField(storage=PublicMediaStorage(), default="")
    customClass = models.CharField(max_length=128)

class Page(models.Model):
    title = models.CharField(max_length=50, default="Untitled")
    slug = AutoSlugField(populate_from='title', unique=True, null=True)

    def __str__(self):
        return self.title

class Layout(models.Model):
    rank = models.IntegerField(default=1000, unique=False)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='mtm', null=True, blank=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='mtm', null=True, blank=True)
    splitSection = models.ForeignKey(SplitSection, on_delete=models.CASCADE, related_name='mtm', null=True, blank=True)

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
