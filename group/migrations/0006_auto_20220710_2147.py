# Generated by Django 3.2.13 on 2022-07-10 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0005_auto_20220704_1355'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='last_updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='payment',
            name='last_updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
