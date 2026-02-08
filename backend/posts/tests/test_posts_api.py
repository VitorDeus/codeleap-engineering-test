import pytest
from rest_framework.test import APIClient


@pytest.fixture
def api():
    return APIClient()


@pytest.mark.django_db
class TestPostsAPI:
    def test_create_post(self, api: APIClient):
        payload = {
            "username": "vitor",
            "title": "Hello World",
            "content": "First post!",
        }
        response = api.post("/careers/", payload, format="json")

        assert response.status_code == 201
        data = response.json()
        assert data["username"] == "vitor"
        assert data["title"] == "Hello World"
        assert data["content"] == "First post!"
        assert "id" in data
        assert "created_datetime" in data

    def test_update_post_title_and_content_only(self, api: APIClient):
        # Create a post
        create = api.post(
            "/careers/",
            {"username": "vitor", "title": "Original", "content": "Original body"},
            format="json",
        )
        post_id = create.json()["id"]

        # PATCH with title, content, and an attempted username change
        response = api.patch(
            f"/careers/{post_id}/",
            {"title": "Updated", "content": "Updated body", "username": "hacker"},
            format="json",
        )

        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Updated"
        assert data["content"] == "Updated body"
        # username must remain unchanged (read-only)
        assert data["username"] == "vitor"

    def test_delete_post(self, api: APIClient):
        # Create a post
        create = api.post(
            "/careers/",
            {"username": "vitor", "title": "To delete", "content": "Bye"},
            format="json",
        )
        post_id = create.json()["id"]

        # DELETE
        response = api.delete(f"/careers/{post_id}/")
        assert response.status_code == 204

        # Confirm it's gone (list should not contain this post)
        listing = api.get("/careers/")
        ids = [p["id"] for p in listing.json()["results"]]
        assert post_id not in ids
