from rest_framework import mixins, viewsets

from .models import Post
from .serializers import PostSerializer


class PostViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    list:   GET    /careers/
    create: POST   /careers/
    partial_update: PATCH  /careers/<pk>/
    destroy: DELETE /careers/<pk>/
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]
