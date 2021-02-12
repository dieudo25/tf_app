from rest_framework import routers

from blog.views import CategorySet, PostPageSet, TagSet

# Custom router which has some advanced feature not implemented by Wagtail
blog_router = routers.DefaultRouter()

# Register viewsets for blog app
blog_router.register(r"posts", PostPageSet)
blog_router.register(r"categories", CategorySet)
blog_router.register(r"tags", TagSet)