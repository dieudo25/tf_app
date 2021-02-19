
from wagtail.core import blocks
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock 



class CustomImageChooserBlock(ImageChooserBlock):
    """
        CustomImageChooserBlocks
        Parameters:
            rendition: defaulft value original
    """
    
    def __init__(self, *args, **kwargs):
        """
            function will be launch when the object is created (initiated)
        """
        self.rendition = kwargs.pop("rendition", "original")
        super().__init__(**kwargs)

    def get_api_representation(self, value, context=None):
        """
            Function used to generate new size for the image 
            and add a new represetation to the API field based on ImageRenditionField
        """
        return ImageRenditionField(self.rendition).to_representation(value)


class ImageTextBlock(blocks.StructBlock):
    """
        ImageTextBlock
    """

    reverse = blocks.BooleanBlock(required=False)
    text = blocks.RichTextBlock()
    image = CustomImageChooserBlock(rendition="width-800")

class AnimatedSliderBlock(blocks.StructBlock):
    """
        AnimatedSliderBlockc
    """

    title = blocks.CharBlock(required=True)
    description = blocks.RichTextBlock()
    button_text = blocks.CharBlock(required=False)
    button = blocks.PageChooserBlock(required=False)
    image = CustomImageChooserBlock(required=True)

class SliderStreamBlock(blocks.StreamBlock):
    """
        SliderBlock
    """

    image_slider = blocks.ListBlock(CustomImageChooserBlock())
    animated_slider = blocks.ListBlock(AnimatedSliderBlock())



class BodyStreamBlock(blocks.StreamBlock):
    """
        BodyBlock
    """

    h1 = blocks.CharBlock()
    h2 = blocks.CharBlock()
    paragraph = blocks.RichTextBlock()
    image_text = ImageTextBlock()
    slider = SliderStreamBlock()
    thumbnail_gallery = blocks.ListBlock(CustomImageChooserBlock())