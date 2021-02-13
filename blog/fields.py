from rest_framework.fields import Field


class CategoryField(Field):
    """
        Custom CategoryField for Rest API
    """

    def to_representation(self, categories):
        """
            Overwrite to_representation method
            Define how the data is represented in JSON

        """
        try:
            return[
                {
                    "name": category.blog_category.name,
                    "slug": category.blog_category.slug,
                    "id": category.blog_category.id,
                } for category in categories.all()
            ]
        except Exception:
            return []


class TagField(Field):
    """
        Custom TagField for Rest API
    """

    def to_representation(self, tags):
        """
            Overwrite to_representation method
            Define how the data is represented in JSON

        """
        try:
            return [
                {
                    "name": tag.name,
                    "slug": tag.slug,
                    "id": tag.id
                } for tag in tags.all()
            ]
        except Exception:
            return[]