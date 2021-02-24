from rest_framework import serializers

from wagtailmenus.models import MainMenu, FlatMenu, MainMenuItem, FlatMenuItem


class MainMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainMenu
        fields = "__all__"


class FlatMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlatMenu
        fields = "__all__"

class MainMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainMenuItem
        fields = "__all__"

class FlatMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlatMenuItem
        fields = "__all__"