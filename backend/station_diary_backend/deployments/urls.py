from django.urls import path
from . import views

urlpatterns = [
    path('seedbase/', views.seedBase.as_view(), name='seedbase'),
    path('data-list/<str:data_type>/', views.DataListView.as_view(), name='data-list'),
    path('create/', views.CreateDeploymentView.as_view(), name='create'),
    path('edit/<uuid:deployment_id>/', views.EditDeploymentView.as_view(), name='edit'),
    path('data-deployment/', views.GetDeploymentsWithFilterView.as_view(), name='data-deployment'),
    path('delete/<uuid:deployment_id>/', views.DeleteDeployment.as_view(), name='delete'),
]