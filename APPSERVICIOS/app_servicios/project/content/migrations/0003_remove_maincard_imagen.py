# Generated by Django 3.2.6 on 2021-10-22 21:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_maincard_imagen'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='maincard',
            name='imagen',
        ),
    ]
