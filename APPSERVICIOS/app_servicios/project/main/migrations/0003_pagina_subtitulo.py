# Generated by Django 3.2.6 on 2021-11-03 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_pagina_titulo'),
    ]

    operations = [
        migrations.AddField(
            model_name='pagina',
            name='subtitulo',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
