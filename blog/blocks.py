
from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock 


class CustomImageChooserBlock(ImageChooserBlock):
    """
        CustomImageChooserBlocks 
    """
    pass


class ImageTextBlock(blocks.StructBlock):
    """
        ImageTextBlock
    """
    reverse = blocks.BooleanBlock(required=False)
    text = blocks.RichTextBlock()
    image = CustomImageChooserBlock()


class BodyBlock(blocks.StreamBlock):
    """
        BodyBlock
    """
    h1 = blocks.CharBlock()
    h2 = blocks.CharBlock()
    paragraph = blocks.RichTextBlock()
    image_text = ImageTextBlock()
    image_carousel = blocks.ListBlock(CustomImageChooserBlock())
    thumbnail_gallery = blocks.ListBlock(CustomImageChooserBlock())