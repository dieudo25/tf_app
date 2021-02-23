import urllib.parse

from django.db import models

from modelcluster.fields import ParentalKey
from rest_framework import serializers
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
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.edit_handlers import ImageChooserPanel

from stream import blocks

from blog.models import BasePage

class HomePage(BasePage):
    """
        Home page of the project
        parameters:
            max_count: Max number of object instance
            subpage_types: List of the accepted child page type
            parent_page_types: List of the accepted parent page type
    """

    # Limite the child page creation with the one mentionned in the list
    subpage_types = [
        'blog.BlogPage',
        'project.ProjectIndexPage',
    ] 

    # The home page can only live under the root page ( another way of limiting creation) 
    parent_page_types = [
        'wagtailcore.Page'
    ]
    max_count = 1   # Can only have one instance of home page

    body = StreamField(
        [
            ("body", blocks.BodyStreamBlock()),
        ],
        null=True,
        blank=True
    )


    content_panels = Page.content_panels + [StreamFieldPanel("body")]
       


    # API Fields that will be dissplay in RestAPI
    api_fields = (
        "body",
        APIField("owner"),
        APIField(
            "last_update",
            serializer=serializers.DateTimeField(format="%d %B %Y", source="last_published_at")
        ),
        APIField(
            "pub_date",
            serializer=serializers.DateTimeField(format="%d %B %Y", source="first_published_at")
        ),
    )

    def get_preview_url(self, token):
        return urllib.parse.urljoin(
            self.get_client_root_url(), # return the value defined in HEADLESS_PREVIEW_CLIENT_URLS in settings.py
            "/"
            + "?"
            + urllib.parse.urlencode(
                {"content_type": self.get_content_type_str(), "token": token}
            ),
        )