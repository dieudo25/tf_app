from django.db import models

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import (
    FieldPanel,
    StreamFieldPanel
)

class HomePage(Page):
    """
        Home page of the project
        parameters:

    """

    # Limite the child page creation with the one mentionned in the list
    subpage_types = [
        'blog.BlogPage',
    ] 

    # The home page can only live under the root page ( another way of limiting creation) 
    parent_page_type = [
        'wagtailcore.Page'
    ]

    max_count = 1   # Can only have one instance of home page

