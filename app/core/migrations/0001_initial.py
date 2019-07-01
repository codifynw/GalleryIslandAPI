# Generated by Django 2.2.1 on 2019-07-01 05:21

import app.storage_backends
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import slugger.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('slug', slugger.fields.AutoSlugField(default='needs-slug', populate_from='title')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Galleries',
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.TextField(default='')),
                ('visible', models.BooleanField(default=True)),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(default='Untitled', max_length=50)),
                ('file', models.FileField(default='', storage=app.storage_backends.PublicMediaStorage(), upload_to='')),
                ('slug', slugger.fields.AutoSlugField(default='needs-slug', populate_from='title')),
                ('galleries', models.ManyToManyField(to='core.Gallery')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DashboardSetting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.Photo')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]