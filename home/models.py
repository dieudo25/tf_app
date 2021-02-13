from django.db import models

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import (
    FieldPanel,
    MultiFieldPanel,
    PageChooserPanel,
    StreamFieldPanel,
    ObjectList,
    TabbedInterface,
)
from wagtail.images.edit_handlers import ImageChooserPanel


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


    # Banner section
    banner_title = models.CharField(max_length=100, blank=True, null=True)
    banner_subtitle = models.CharField(max_length=100, blank=True, null=True)
    banner_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    banner_cta_1 = models.ForeignKey(
        "wagtailcore.Page",
        null=True,  # True = the button is optional, False = it is required
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    banner_cta_2 = models.ForeignKey(
        "wagtailcore.Page",
        null=True,  # True = the button is optional, False = it is required
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    banner_panels = [
        MultiFieldPanel([
            FieldPanel('banner_title'),
            FieldPanel('banner_subtitle'),
            ImageChooserPanel('banner_image'),
            PageChooserPanel('banner_cta_1'),
            PageChooserPanel('banner_cta_2'),
        ], heading="Banner options"),
    ]

    # Edit wagtail panels
    edit_handler = TabbedInterface(
        [
            ObjectList(banner_panels, heading="Banner"), # Add sidebar tab in home page edit
        ]
    )


