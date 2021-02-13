from django.db import models

from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import (
    FieldPanel,
)

class ProjectIndexPage(Page):
    """
        Model of the index of the projects
        parameters:
            description: Description of the page
            content_panels: specify witch attributs will be display in Admin Page
            max_count: Max number of object instance
            subpage_types: List of the accepted child page type
    """

    description = models.CharField(max_length=200, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("description", classname="full"),
    ]

    max_count = 1 # Nombre maximum de l'objet

    # Limite the child page creation with the one mentionned in the list
    subpage_types = [
        'project.ProjectPage',
    ]


class ProjectPage(Page):
    """
        Model of the project page
        Parameters:
            parent_page_types: List of the accepted parent type page
            subpage_types: List of the accepted child page type
            header_image: Front image of the project
            body: StreamField using BodyBlock blocks
    """

    parent_page_types = ["project.ProjectIndexPage"]
    subpage_types = [] # This object (page) can not create child pages

    header_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    # body = StreamField(BodyBlock(), blank=True)

    content_panels = Page.content_panels + [
        ImageChooserPanel("header_image"),
    ]

    