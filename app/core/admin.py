from django.contrib import admin
from .models import Photo, Gallery, MenuItem
from .models import DashboardSetting

# Register your models here.
admin.site.register(Photo)
admin.site.register(Gallery)
admin.site.register(DashboardSetting)
admin.site.register(MenuItem)
