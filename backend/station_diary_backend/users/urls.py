from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('seedbase/', views.seedBase.as_view(), name='seedbase'),
    path('data-list/<str:data_type>/', views.DataListView.as_view(), name='data-list'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    path('data-users/', views.GetUsersWithFilterView.as_view(), name='data-users'),
]