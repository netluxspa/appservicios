# Generated by Django 3.2.6 on 2021-10-22 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0006_maincard_subtitulo'),
    ]

    operations = [
        migrations.AddField(
            model_name='maincard',
            name='parrafo',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]