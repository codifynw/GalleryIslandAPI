from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from app.storage_backends import PublicMediaStorage
from slugger import AutoSlugField


class Gallery(models.Model):
    title = models.CharField(max_length=30)
    slug = AutoSlugField(populate_from='title', default="needs-slug")
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    cover_photo = models.ForeignKey('Photo', on_delete=models.CASCADE, default=None, null=True)

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
    slug = AutoSlugField(populate_from='title', default="needs-slug")
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)

    def __str__(self):
       return self.title


class DashboardSetting(models.Model):
    background = models.ForeignKey(Photo, null=True, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)

    def __str__(self):
       return self.user.username + ' settings'
