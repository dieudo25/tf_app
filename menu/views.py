from rest_framework import viewsets

from wagtailmenus.models import (
    MainMenu,
    FlatMenu, 
    MainMenuItem, 
    FlatMenuItem,
)
from .serializers import (
    MainMenuSerializer, 
    FlatMenuSerializer, 
    MainMenuItemSerializer, 
    FlatMenuItemSerializer,
    MenuSerializer,
    MenuItemSerializer,
)
from .models import (
    Menu,
    MenuItem,
)

class MainMenuSet(viewsets.ModelViewSet):
    serializer_class = MainMenuSerializer
    queryset = MainMenu.objects.all()
    http_method_names = ["get"]


class FlatMenuSet(viewsets.ModelViewSet):
    serializer_class = FlatMenuSerializer
    queryset = FlatMenu.objects.all()
    http_method_names = ["get"]


class MainMenuItemSet(viewsets.ModelViewSet):
    serializer_class = MainMenuItemSerializer
    queryset = MainMenuItem.objects.all()
    http_method_names = ["get"]


class FlatMenuItemSet(viewsets.ModelViewSet):
    serializer_class = FlatMenuItemSerializer
    queryset = FlatMenuItem.objects.all()
    http_method_names = ["get"]


class MenuSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()
    http_method_names = ["get"]


class MenuItemSet(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
    http_method_names = ["get"]