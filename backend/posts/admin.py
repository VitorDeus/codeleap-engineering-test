from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "title", "created_datetime")
    list_filter = ("created_datetime",)
    search_fields = ("username", "title")
