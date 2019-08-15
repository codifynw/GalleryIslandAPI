# Generated by Django 2.2.3 on 2019-08-15 06:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0009_auto_20190807_0703'),
    ]

    operations = [
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aboutContent', tinymce.models.HTMLField()),
                ('background', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.Photo')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='DashboardSetting',
        ),
    ]
