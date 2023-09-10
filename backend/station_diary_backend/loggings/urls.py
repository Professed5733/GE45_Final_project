from django.urls import path
from . import views

urlpatterns = [
    path('seedbase/', views.seedBase.as_view(), name='seedbase'),
    path('data-list/<str:data_type>/', views.DataListView.as_view(), name='data-list'),
    path('subject-create/', views.CreateSubjectView.as_view(), name='subject-create'),
    path('subject-edit/<uuid:subject_id>/', views.EditSubjectView.as_view(), name='edit'),
]