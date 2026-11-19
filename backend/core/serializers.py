from rest_framework import serializers
from .models import (
    Exercise, PaymentPlan, PersonalRecord,
    Profile, Program, Workout, WorkoutExercise,
)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'role', 'bio']
        read_only_fields = ['user']


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'muscle_group', 'description', 'created_by']
        read_only_fields = ['created_by']


class PersonalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalRecord
        fields = ['id', 'user', 'exercise', 'weight', 'reps', 'date']
        read_only_fields = ['user', 'date']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'created_by']
        read_only_fields = ['created_by']


class WorkoutExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutExercise
        fields = ['id', 'workout', 'exercise', 'sets', 'reps', 'order']


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'name', 'description', 'created_by']
        read_only_fields = ['created_by']


class PaymentPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentPlan
        fields = ['id', 'name', 'price', 'duration_days']