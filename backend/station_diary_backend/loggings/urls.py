from django.urls import path
from . import views

urlpatterns = [
    path('seedbase/', views.seedBase.as_view(), name='seedbase'),
    path('data-list/<str:data_type>/', views.DataListView.as_view(), name='data-list'),
    path('subject-create/', views.CreateSubjectView.as_view(), name='subject-create'),
    path('subject-edit/<uuid:subject_id>/', views.EditSubjectView.as_view(), name='edit'),
    path('subject-list/', views.GetSubjectsView.as_view(), name='subject-list'),
    path('log-create/', views.CreatLoggingeView.as_view(), name='log-create'),
    path('log-delete/<uuid:logging_id>/', views.DeleteLogging.as_view(), name='log-delete'),
]