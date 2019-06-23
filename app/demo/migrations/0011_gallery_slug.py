# Generated by Django 2.2.1 on 2019-06-23 22:47

from django.db import migrations
import slugger.fields


class Migration(migrations.Migration):

    dependencies = [
        ('demo', '0010_auto_20190623_2238'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='slug',
            field=slugger.fields.AutoSlugField(default='needs-slug', populate_from='title'),
        ),
    ]
