from django.urls import path

from . import views

urlpatterns = [
    path('users', views.users),
    path('add-user', views.add_user),
    path('delete-user', views.delete_user),
    path('edit-user', views.edit_user),
]
