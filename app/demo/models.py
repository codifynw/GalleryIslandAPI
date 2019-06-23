from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from app.storage_backends import PublicMediaStorage, PrivateMediaStorage
from slugger import AutoSlugField

class Photo(models.Model):
    caption = models.TextField(default="")
    visible = models.BooleanField(default=True)
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



# class UploadPrivate(models.Model):
#     title = models.CharField(max_length=50, default="Untitled")
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
#     uploaded_at = models.DateTimeField(auto_now_add=True)
#     file = models.FileField(storage=PrivateMediaStorage(), default="")
#
#     def __unicode__(self):
#        return self.title
