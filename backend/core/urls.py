from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    ExerciseViewSet, PaymentPlanViewSet, PersonalRecordViewSet,
    ProfileViewSet, ProgramViewSet, WorkoutExerciseViewSet, WorkoutViewSet,
)

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'personal-records', PersonalRecordViewSet, basename='personal-records')
router.register(r'workouts', WorkoutViewSet)
router.register(r'workout-exercises', WorkoutExerciseViewSet)
router.register(r'programs', ProgramViewSet)
router.register(r'payment-plans', PaymentPlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
]