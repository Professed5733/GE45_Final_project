from django.urls import path
from . import views

urlpatterns = [
    path('seedbase/', views.seedBase.as_view(), name='seedbase'),
    path('data-list/<str:data_type>/', views.DataListView.as_view(), name='data-list'),
    path('create/', views.CreateDeploymentView.as_view(), name='create'),
]