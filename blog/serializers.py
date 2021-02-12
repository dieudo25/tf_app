
from rest_framework import serializers

from .models import BlogCategory, PostPage, Tag


class PostPageSerializer(serializers.ModelSerializer):
    """
        PostPageserializer
        Serialize the blog.PostPage model instances to target format
    """
    class Meta:
        model = PostPage
        fields = (
            "id",
            "slug",
            "title",
        )


class CategorySerializer(serializers.ModelSerializer):
    """
        BlogCategorySerializer
        Serialize the blog.BlogCategory model instances to target format
    """
    class Meta:
        model = BlogCategory
        fields = (
            "id",
            "slug",
            "name",
        )


class TagSerializer(serializers.ModelSerializer):
    """
        TagSerializer
        Serialize the blog.TagSerializer model instances to target format
    """
    class Meta:
        model = Tag
        fields = (
            "id",
            "slug",
            "name",
        )