from rest_framework.fields import Field


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