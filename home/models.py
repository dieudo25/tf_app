from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.api import APIField
from wagtail.core.fields import StreamField
from wagtail.core.models import Page, Orderable
from wagtail.admin.edit_handlers import (
    FieldPanel,
    MultiFieldPanel,
    PageChooserPanel,
    StreamFieldPanel,
    InlinePanel,
)
from wagtail.images.edit_handlers import ImageChooserPanel

from stream import blocks

class HomePage(Page):
    """
        Home page of the project
        parameters:
            max_count: Max number of object instance
            subpage_types: List of the accepted child page type
            parent_page_type: List of the accepted parent page type
    """

    # Limite the child page creation with the one mentionned in the list
    subpage_types = [
        'blog.BlogPage',
        'project.ProjectIndexPage',
    ] 

    # The home page can only live under the root page ( another way of limiting creation) 
    parent_page_type = [
        'wagtailcore.Page'
    ]
    max_count = 1   # Can only have one instance of home page

    ######### Banner section #########
    banner_title = models.CharField(max_length=100, blank=True, null=True)
    banner_subtitle = models.CharField(max_length=100, blank=True, null=True)
    banner_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    button = models.ForeignKey(
        "wagtailcore.Page",
        null=True,  # True = the button is optional, False = it is required
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    content = StreamField(
        [
            ("ImageText", blocks.ImageTextBlock()),
            ("body", blocks.BodyBlock()),
        ],
        null=True,
        blank=True
    )


    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('banner_title'),
            FieldPanel('banner_subtitle'),
            ImageChooserPanel('banner_image'),
            PageChooserPanel('button'),
        ], heading="Banner"),
        StreamFieldPanel("content"),
    ]