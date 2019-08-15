from django.contrib import admin
from .models import Photo, Gallery, MenuItem
from .models import Setting, Catalog

# Register your models here.
admin.site.register(Photo)
admin.site.register(Gallery)
admin.site.register(Catalog)
admin.site.register(Setting)
admin.site.register(MenuItem)
