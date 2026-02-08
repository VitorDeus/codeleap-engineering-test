from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "username", "created_datetime", "title", "content"]
        read_only_fields = ["id", "created_datetime"]

    def get_fields(self):
        fields = super().get_fields()
        # username is writable on create, read-only on update
        if self.instance is not None:
            fields["username"].read_only = True
        return fields
