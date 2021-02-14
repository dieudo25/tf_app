from django.utils.text import slugify

from factory import (
    DjangoModelFactory,
    LazyAttribute,
    Sequence,
)
from factory.fuzzy import FuzzyText
from wagtail_factories import PageFactory

from home.models import HomePage


class HomePageFactory(PageFactory):
    """
        HomePageFactory used to create model for UnitTest
        Inherit from PageFactory from wagtail_factories module
    """

    class Meta():
        model = HomePage

    title = Sequence(lambda n: "HomePage %d" % n)
    