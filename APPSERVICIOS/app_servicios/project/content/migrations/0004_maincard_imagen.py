# Generated by Django 3.2.6 on 2021-10-22 21:08

import content.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_remove_maincard_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='maincard',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to=content.models.scramble_uploaded_filename),
        ),
    ]