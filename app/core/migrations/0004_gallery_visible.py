# Generated by Django 2.2.1 on 2019-07-15 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_gallery_cover_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='visible',
            field=models.BooleanField(default=True),
        ),
    ]