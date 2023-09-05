from django.urls import path
from . import views

urlpatterns = [
    path('seedbase/', views.seedBase, name='seedbase'),
]