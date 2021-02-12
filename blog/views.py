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

    def get_queryset(self):
        """
            Fonction that filter the queryset of PostPage model instance
            By category from BlogCategory Model or by tag from Tag model
        """
        queryset = PostPage.objects.all()
        category = self.request.query_params.get("category", None)
        tag = self.request.query_params.get("tag", None)

        if category is not None and category != "*":
            queryset = queryset.filter(categories__blog_category__slug=category)
        if tag is not None and tag != "*":
            queryset = queryset.filter(tags__slug=tag)

        return queryset


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