from django.utils.text import slugify

from factory import (
    DjangoModelFactory,
    LazyAttribute,
    Sequence,
)
from factory.fuzzy import FuzzyText
from wagtail_factories import PageFactory

from blog.models import (
    BlogCategory,
    BlogPage,
    PostPageBlogCategory,
    PostPageTag,
    PostPage,
    Tag,
)


class BlogPageFactory(PageFactory):
    """
        BlogPageFactory used to create model for UnitTest
        Inherit from PageFactory from wagtail_factories module
    """

    class Meta:
        model = BlogPage
    
    title = Sequence(lambda n: "BlogPage %d" % n) # would make the page has title like PostPage 1, PostPage 2, and so on.


class PostPageFactory(PageFactory):
    """
        PostPageFactory used to create model for UnitTest
        Inherit from PageFactory from wagtail_factories module
    """

    class Meta:
        model = PostPage

    title = Sequence(lambda n: "PostPage %d" % n) # would make the page has title like PostPage 1, PostPage 2, and so on.


class PostPageBlogCategoryFactory(DjangoModelFactory):
    """
        PostPageBlogCategoryFactory used to create model for UnitTest
        Inherit from DjangoModelFactory from factory-boy module
    """

    class Meta:
        model = PostPageBlogCategory


class BlogCategoryFactory(DjangoModelFactory):
    """
        BlogCategoryFactory used to create model for UnitTest
        Inherit from DjangoModelFactory from factory-boy module
    """

    class Meta:
        model = BlogCategory

    name = FuzzyText(length=6)
    slug = LazyAttribute(lambda o: slugify(o.name))


class PostPageTagFactory(DjangoModelFactory):
    """
        PostPageTagFactory used to create model for UnitTest
        Inherit from DjangoModelFactory from factory-boy module
    """

    class Meta:
        model = PostPageTag


class TagFactory(DjangoModelFactory):
    """
        TagFactory used to create model for UnitTest
        Inherit from DjangoModelFactory from factory-boy module
    """

    class Meta:
        """
            Use meta to set the model the factory would use
        """
        model = Tag

    name = FuzzyText(length=6) # Random string with a length of 6
    slug = LazyAttribute(lambda o: slugify(o.name))
