
from wagtail.core import blocks
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock 



class HeadingsBlock(blocks.StreamBlock):
    """
        HeadingsBlock
    """

    h1 = blocks.CharBlock()
    h2 = blocks.CharBlock()
    h3 = blocks.CharBlock()
    h4 = blocks.CharBlock()
    h5 = blocks.CharBlock()
    h6 = blocks.CharBlock()


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


class TwoTextBlock(blocks.StructBlock):
    """
        ImageTextBlock
    """

    text_1 = blocks.RichTextBlock()
    text_2 = blocks.RichTextBlock()


class ThreeTextBlock(blocks.StructBlock):
    text_1 = blocks.RichTextBlock()
    text_2 = blocks.RichTextBlock()
    text_3 = blocks.RichTextBlock()

class FourTextBlock(blocks.StructBlock):
    text_1 = blocks.RichTextBlock()
    text_2 = blocks.RichTextBlock()
    text_3 = blocks.RichTextBlock()
    text_4 = blocks.RichTextBlock()

class TwoColumnsStreamBlock(blocks.StreamBlock):
    image_text = ImageTextBlock()
    two_text = TwoTextBlock()
    

class ThreeColumnsStreamBlock(blocks.StreamBlock):
    three = ThreeTextBlock()
    

class FourColumnsStreamBlock(blocks.StreamBlock):
    four_text = FourTextBlock()
    

class ColumnStreamBlock(blocks.StreamBlock):
    """
        ColumnStreamBlock
    """

    two_columns = TwoColumnsStreamBlock()
    three_columns = ThreeColumnsStreamBlock()
    four_columns = FourColumnsStreamBlock()


class CTABlock(blocks.StructBlock):


    """
        CTABlock
    """

    title = blocks.CharBlock(required=True)
    sub_title = blocks.CharBlock(required=False)
    button = blocks.PageChooserBlock(required=False)


class BodyStreamBlock(blocks.StreamBlock):
    """
        BodyBlock
    """

    headings = HeadingsBlock()
    paragraph = blocks.RichTextBlock()
    column = ColumnStreamBlock()
    slider = SliderStreamBlock()
    thumbnail_gallery = blocks.ListBlock(CustomImageChooserBlock())
    two_columns = TwoColumnsStreamBlock()
    three_columns = ThreeColumnsStreamBlock()
    four_columns = FourColumnsStreamBlock()