
from rest_framework import serializers

from .fields import TagField
from .models import BlogCategory, PostPage, Tag


class PostPageSerializer(serializers.ModelSerializer):
    """
        PostPageserializer
        Serialize the blog.PostPage model instances to target format
    """

    api_tags = TagField(source='tags') # tags => field of the PostPage model
    
    class Meta:
        model = PostPage
        fields = (
            "id",
            "slug",
            "title",
            "api_tags",
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