from django.test import TestCase
from wagtail.core.models import Site
from blog.factories import (
    BlogCategoryFactory,
    PostPageBlogCategoryFactory,
    BlogPageFactory,
    PostPageTagFactory,
    PostPageFactory,
    TagFactory,
)

class TestView(TestCase):
    """
        Test blog.views
    """

    def setUp(self):
        self.blog_page = BlogPageFactory.create() # Create BlogPage

        self.site = Site.objects.all().first()
        self.site.root_page = self.blog_page # Set blog_page as root_page 
        self.site.save()

    def test_category_view(self):
        """
            Test category view
        """

        # Arrange
        category_1 = BlogCategoryFactory.create()

        # Act
        response = self.client.get("/api/blog/categories/")
        response_data = response.json()

        # Assert
        # Test if the fetched response data equal factory data
        assert response_data["results"][0]["name"] == category_1.name
        assert response_data["results"][0]["slug"] == category_1.slug

        # Arrange
        BlogCategoryFactory.create()

        # Act
        # Fetch data from Rest API
        response = self.client.get("/api/blog/categories/")
        response_data = response.json()

        # Assert
        # Test if the length of the fetched response_data is equal to the the length of the factory data
        assert len(response_data["results"]) == 2

    def test_tag_view(self):
        """
            Test tag view
        """

        # Arrange
        tag_1 = TagFactory.create()

        # Act
        # Fetch tags from Rest API
        response = self.client.get("/api/blog/tags/")
        repsonse_data = response.json()

        #Assert
        # Test if the response data equal factory data
        assert repsonse_data["results"][0]["name"] == tag_1.name
        assert repsonse_data["results"][0]["slug"] == tag_1.slug

        # Arrange
        TagFactory.create()

        # Act
        # Fetch tags from Rest API
        response = self.client.get("/api/blog/tags/")
        response_data = response.json()
        
        # Assert
        # Test if the length of the fetched response_data is equal to the the length of the factory data
        assert len(response_data["results"]) == 2

    def test_post_page_view(self):
        """
            Test PostPageView
        """
        
        # Arrange
        post_page = PostPageFactory.create(parent=self.blog_page,)
        category_1 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page,
            blog_category=category_1,
        )
        tag_1 = TagFactory.create()
        PostPageTagFactory.create(
            content_object=post_page,
            tag=tag_1,
        )
        category_2 = BlogCategoryFactory.create()
        tag_2 = TagFactory.create()

        # Act
        # Fetch posts from Rest API with filter from category_1 slug
        response = self.client.get(
            f"/api/blog/posts/?category={category_1.slug}&tag=*"
        )
        response_data = response.json()

        # Assert
        # Test if the post fetched from response_data equals post_page
        assert response_data["results"][0]["id"] == post_page.pk

        # Act
        # Fetch posts from Rest API with filter from tag
        response = self.client.get(
            f"/api/blog/posts/?category=*&tag={tag_1.slug}"
        )
        response_data = response.json()

        # Assert
        # Test if the post fetched from response_data equals post_page
        assert response_data["results"][0]["id"] == post_page.pk

        # Act
        # Fetch posts from Rest API 
        response = self.client.get("/api/blog/posts/")
        response_data = response.json()

        # Assert
        # Test if the post fetched from response_data equals post_page
        assert response_data["results"][0]["id"] == post_page.pk

        # Act
        # Fetch empty list of posts using tag_2 as filter
        response = self.client.get(
            f"/api/blog/posts/?category=*&tag={tag_2.slug}"
        )
        response_data = response.json()

        # Assert
        # Test if the count of the fetched posts is equals to 0
        assert response_data["count"] == 0

        # Act
        response = self.client.get(
            f"/api/blog/posts/?category={category_2.slug}&tag=*"
        )
        response_data = response.json()

        # Assert
        # Test if the count of the fetched data is equals to 0
        assert response_data["count"] == 0



