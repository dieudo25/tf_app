import json
import factory

from django.test import TestCase
from wagtail.core.models import Site
from wagtail_factories.factories import ImageFactory
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

class TestPostPageAPI(TestCase):
    """
        Test PostPageAPI
    """
    def setUp(self):
        self.blog_page = BlogPageFactory.create()
        self.site = Site.objects.all().first()
        self.site.root_page = self.blog_page
        self.site.save()
    
    def test_post_page(self):

        # Arrange
        img_1 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))
        img_2 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))
        img_3 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))

        # Data for StreamField
        body_data = [
            {
                'type': 'h1',
                'value': 'The Zen of Wagtail'
            },
            {
                'type': 'paragraph',
                'value':   '<p>Wagtail has been born out of many years of experience building '
                            'websites, learning approaches that work and ones that don’t, and '
                            'striking a balance between power and simplicity, structure and '
                            'flexibility. We hope you’ll find that Wagtail is in that sweet '
                            'spot.</p>'
            },
            {
                'type': 'image_carousel',
                'value': [img_1.pk, img_2.pk]
            },
            {
                'type': 'image_text',
                'value': {
                    'image': img_3.pk,
                    'reverse': False,
                    'text':     '<p>Wagtail is not an instant website in a box.</p><p>You '
                                'can’t make a beautiful website by plugging off-the-shelf '
                                'modules together - expect to write code.</p>'
                }
            },
            {
                'type': 'image_text',
                'value': {
                    'image': img_2.pk,
                    'reverse': True,
                    'text':     '<p>A CMS should get information out of an editor’s head '
                                'and into a database, as efficiently and directly as '
                                'possible.</p>'
                }
            }
        ]

        post_page = PostPageFactory.create(
            parent=self.blog_page, body=json.dumps(body_data), header_image=img_3   # json.dumps() => dump data in json format
        )

        # Act
        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        # Assert
        # Test if the fetched post body (StreamField) field data return the correct block
        assert response_data["body"][1]["value"] == body_data[1]["value"]

        # Test the get_api_representation
        assert response_data["body"][3]["type"] == "image_text"
        assert response_data["body"][3]["value"]["image"]["width"] == 800

    def test_post_page_category(self):

        # Arrange
        post_page = PostPageFactory.create(parent=self.blog_page,)
        category_1 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page,
            blog_category=category_1,
        )
        category_2 = BlogCategoryFactory.create()
        PostPageBlogCategoryFactory.create(
            page=post_page,
            blog_category=category_2,
        )

        # Act
        # Fetch post from API using post_page
        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        # Assert
        # Test if the category of the post is equals category_1
        assert response_data["api_categories"][0]["name"] == category_1.name
        assert response_data["api_categories"][0]["slug"] == category_1.slug

        # Act
        # Fetch post from API using post_page
        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        # Assert
        # Test if the length of the fetched post categories is equal to 2
        assert len(response_data["api_categories"]) == 2

    def test_post_page_tag(self):

        # Arrange
        post_page = PostPageFactory.create(parent=self.blog_page)
        tag_1 = TagFactory.create()
        PostPageTagFactory(
            content_object=post_page,
            tag=tag_1,
        )
        tag_2 = TagFactory.create()
        PostPageTagFactory(
            content_object=post_page,
            tag=tag_2,
        )

        # Act
        # Fetch post from api using post_page
        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        # Assert
        # Test if the tag of the post is equals to tag_1
        assert response_data["api_tags"][0]["name"] == tag_1.name
        assert response_data["api_tags"][0]["slug"] == tag_1.slug

        # Act
        # Fetch post from api using post_page
        response = self.client.get(f"/api/cms/pages/{post_page.pk}/")
        response_data = response.json()

        # Assert
        # Test the length of the fetched post tags is equal to 2
        assert len(response_data["api_tags"]) == 2

        


