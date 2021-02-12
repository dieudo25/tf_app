from rest_framework import viewsets

from .models import BlogCategory, PostPage, Tag
from .serializers import CategorySerializer, PostPageSerializer, TagSerializer


class PostPageSet(viewsets.ModelViewSet):
    """
        PostPageSet
        APIViewSet of PostPage Model
    """
    serializer_class = PostPageSerializer
    queryset = PostPage.objects.all()
    http_method_names = ["get"]


class CategorySet(viewsets.ModelViewSet):
    """
        CategorySet
        APIViewSet of CategorySet
    """
    serializer_class = CategorySerializer
    queryset = BlogCategory.objects.all()
    http_method_names = ["get"]


class TagSet(viewsets.ModelViewSet):
    """
        TagSet
        APIViewSet of TagSet
    """
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    http_method_names = ["get"]