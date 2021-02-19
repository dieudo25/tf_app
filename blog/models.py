from django.db import models

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from rest_framework import serializers
from taggit.models import Tag as TaggitTag, TaggedItemBase
from wagtail.api import APIField
from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import  (
    FieldPanel,
    InlinePanel,
    StreamFieldPanel,
)
from wagtail.snippets.models import register_snippet
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.search import index

from .fields import TagField, CategoryField
from stream.blocks import BodyStreamBlock

class BlogPage(Page):
    """
        Model of the BlogPage => index page of the PostPage
        parameters :
            description: Description of the page 
            content_panels: specify witch attributs will be display in Admin Page
            max_count: Max number of object instance
            subpage_types: List of the accepted child page type
            parent_page_types: List of the accepted parent page type
    """

    description = models.CharField(max_length=50, blank=True)

    # Used to display the field in wagtail admin
    content_panels = Page.content_panels + [
        FieldPanel("description", classname="full"),
    ]

    max_count = 1 # Nombre maximum de l'objet

    # Limite the child page creation with the one mentionned in the list
    subpage_types = [
        'blog.PostPage',
    ]
    parent_page_types = [
        'home.HomePage'
    ]


class PostPage(Page):
    """ 
        Model of the PostPage
        Parameters :
            parent_page_types: List of the accepted parent type page
            subpage_types: List of the accepted child page type
            header_image: Front image of the post 
            body: StreamField using BodyStreamBlock blocks
            tags: tags of the post relations to Tag model through PostPage model
            content_panels: specify witch attributs will be display in Admin Page
            api_fields : Specify witch attribut will be displayed for API

    """

    parent_page_types = ["blog.BlogPage"]
    subpage_types = [] # This object (page) can not create child pages

    header_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    body = StreamField(BodyStreamBlock(), blank=True)

    tags = ClusterTaggableManager(through="blog.PostPageTag", blank=True)

    # Used to display the field in wagtail admin
    content_panels = Page.content_panels + [
        ImageChooserPanel("header_image"),
        # The categories relationship is already defined in PostPageBlogCategory.page.related_name
        InlinePanel("categories", label="category"), 
        FieldPanel("tags"),
        StreamFieldPanel("body"),
    ]

    # API Fields that will be dissplay in RestAPI
    api_fields = (
        APIField(
            "header_image_url",
            serializer=ImageRenditionField("max-1000x800", # We use ImageRenditionField to control the headers_image size
            source="header_image"),
        ),
        "body",
        APIField("owner"),
        APIField("api_tags", serializer=TagField(source="tags")),
        APIField(
            "pub_date",
            serializer=serializers.DateTimeField(format="%d %B %Y", source="last_published_at")
        ),
        APIField("api_categories", serializer=CategoryField(source="categories")),
    )


class PostPageBlogCategory(models.Model):
    """
        Intermediary model beetwen PostPage and BlogCategory Model
        So the connections between PostPage and a snippet BlogCategory can be stored in the db.
        Attribut :
            page: relations to PostPage model using wagtail ParentalKey
            blog_category: relations to BlogCategory model using ForeignKey
            panels: specify witch attributs will be display in Admin

    """

    page = ParentalKey("blog.PostPage", on_delete=models.CASCADE, related_name="categories")
    blog_category = models.ForeignKey("blog.BlogCategory", on_delete=models.CASCADE, related_name="post_pages")

    panels = [
        SnippetChooserPanel("blog_category"),
    ]

    class Meta:
        unique_together = ("page", "blog_category")  #add db constraints to avoid duplicate records

class PostPageTag(TaggedItemBase):
    """
        Intermediary model beetwen PostPage and Tag Model
        So the connections between PostPage and a snippet Tag can be stored in the db.
        Parameters :
            content_object: relations to PostPage model using wagtail ParentalKey
    """

    content_object = ParentalKey("PostPage", related_name="post_tags")

@register_snippet
class BlogCategory(index.Indexed, models.Model):
    """
        Model of BlogCategory
        Use as a wagtail snippet with register_snippet
        So that we can add/edit/delete the model instances in snippets of Wagtail admin.
        Attributs:
            name: namae of the category
            slug: slug of the category model instance
            panels: specify witch attributs will be display in Admin
            search_fields: specify the attribut used for searching this snippet
    """

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=80)

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
    ]

    search_fields = [
        index.SearchField("name", partial_match=True)
    ]
    
    def __str__(self):
        """ 
            String representation of the BlogCategory model instance
        """
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


@register_snippet
class Tag(TaggitTag):
    """
        Model of Tag => Proxy model to declare Taggit as a wagtail snippet
        Extends Taggit, the built-in support for tag in wagtail
    """
    
    class Meta:
        proxy = True