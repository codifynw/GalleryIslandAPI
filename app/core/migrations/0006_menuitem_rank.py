# Generated by Django 2.2.3 on 2019-07-29 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_menuitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='menuitem',
            name='rank',
            field=models.IntegerField(default=9, unique=True),
        ),
    ]
