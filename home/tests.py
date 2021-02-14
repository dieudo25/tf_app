""" import json
from django.test import TestCase
import factory
from wagtail.core.models import Site
from wagtail_factories.factories import ImageFactory

from home.factories import HomePageFactory


class TestHomePageAPI(TestCase):

        Test HomePageAPI


    def setUp(self):
        self.img_1 = ImageFactory(file=factory.django.ImageField(width=1000, height=1000))
        self.home_page = HomePageFactory.create(banner_image=self.img_1,)
        self.site = Site.objects.all().first()
        self.site.root_page = self.home_page
        self.site.save()

    def test_home_page(self):

        # Arrange
        # Data for streamField
        body_data = [
            {
                "type": "ImageText",
                "value": {
                    "reverse": False,
                    "text": "<p>yoyoyo</p>",
                    "image": self.img_1.pk
                },
                "id": "624a3ef9-641b-4763-be98-17c2f3647efe"
            },
            {
                "type": "body",
                "value": [
                    {
                        "type": "h2",
                        "value": "yoyoyo",
                        "id": "7533a0ce-64a6-4cbd-bed4-3072b5ad78c2"
                    }
                ],
                "id": "1977fbea-dff4-4b5e-8dd4-a3fa54a5b74e"
            }
        ]

        home_page = HomePageFactory.create(
            banner_image=self.img_1,
            body=json.dumps(body_data),
        )

        # Act
        response = self.client.get(f"/api/cms/pages/{home_page.pk}/")
        response_data = response.json()

        # Assert
        # Test if the fetched post body (StreamField) field data return the correct block

        assert response_data["body"][1]["value"] == body_data[1]["value"]

        # Test the get_api_representation
        assert response_data["body"][2]["type"] == "body"
        assert response_data["body"][2]["value"]["value"] == "yoyoyo" """