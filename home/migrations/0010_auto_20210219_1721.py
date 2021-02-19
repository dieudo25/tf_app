# Generated by Django 3.1 on 2021-02-19 17:21

from django.db import migrations
import stream.blocks
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_auto_20210214_0302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='body',
            field=wagtail.core.fields.StreamField([('ImageText', wagtail.core.blocks.StructBlock([('reverse', wagtail.core.blocks.BooleanBlock(required=False)), ('text', wagtail.core.blocks.RichTextBlock()), ('image', stream.blocks.CustomImageChooserBlock(rendition='width-800'))])), ('body', wagtail.core.blocks.StreamBlock([('h1', wagtail.core.blocks.CharBlock()), ('h2', wagtail.core.blocks.CharBlock()), ('paragraph', wagtail.core.blocks.RichTextBlock()), ('image_text', wagtail.core.blocks.StructBlock([('reverse', wagtail.core.blocks.BooleanBlock(required=False)), ('text', wagtail.core.blocks.RichTextBlock()), ('image', stream.blocks.CustomImageChooserBlock(rendition='width-800'))])), ('slider', wagtail.core.blocks.StreamBlock([('image_slider', wagtail.core.blocks.ListBlock(stream.blocks.CustomImageChooserBlock())), ('animated_slider', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(required=True)), ('description', wagtail.core.blocks.RichTextBlock()), ('button_text', wagtail.core.blocks.CharBlock(required=False)), ('button', wagtail.core.blocks.PageChooserBlock(required=False)), ('image', stream.blocks.CustomImageChooserBlock(required=True))])))])), ('thumbnail_gallery', wagtail.core.blocks.ListBlock(stream.blocks.CustomImageChooserBlock()))]))], blank=True, null=True),
        ),
    ]
