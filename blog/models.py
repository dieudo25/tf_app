from django.db import models

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import Tag as TaggitTag, TaggedItemBase
from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import  FieldPanel, InlinePanel, StreamFieldPanel
from wagtail.snippets.models import register_snippet
from wagtail.snippets.edit_handlers import SnippetChooserPanel

from .blocks import BodyBlock

class BlogPage(Page):
    """
        Model of the BlogPage => index page of the PostPage
        fields :
            description: Description of th epage 
    """
    description = models.CharField(max_length=50, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("description", classname="full"),
    ]


class PostPage(Page):
    """ 
        Model of the PostPage
        fields :
            header_image: Front image of the post 
            tags: tags of the post
    """
    header_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    body = StreamField(BodyBlock(), blank=True)

    tags = ClusterTaggableManager(through="blog.PostPageTag", blank=True)

    content_panels = Page.content_panels + [
        ImageChooserPanel("header_image"),
        # The categories relationship is already defined in PostPageBlogCategory.page.related_name
        InlinePanel("categories", label="category"), 
        FieldPanel("tags"),
        StreamFieldPanel("body"),
    ]


class PostPageBlogCategory(models.Model):
    """
        Intermediary model beetwen PostPage and BlogCategory Model
        So the connections between PostPage and a snippet BlogCategory can be stored in the db.
    """

    page = ParentalKey("blog.PostPage", on_delete=models.CASCADE, related_name="categories")
    blog_category = models.ForeignKey("blog.BlogCategory", on_delete=models.CASCADE, related_name="post_pages")

    panels = [
        SnippetChooserPanel("blog_category"),
    ]

    class Meta:
        unique_together = ("page", "blog_category")  #add db constraints to avoid duplicate records

class PostPageTag(TaggedItemBase):
    content_object = ParentalKey("PostPage", related_name="post_tags")

@register_snippet
class BlogCategory(models.Model):
    """
        Model of BlogCategory
        Use as a wagtail snippet with register_snippet
        So that we can add/edit/delete the model instances in snippets of Wagtail admin.
    """
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=80)

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
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