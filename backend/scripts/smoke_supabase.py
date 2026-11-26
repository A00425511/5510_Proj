
from django.db import connection, transaction
from django.contrib.auth import get_user_model
from core.models import Exercise
from uuid import uuid4

User = get_user_model()

print("====================================")
print("REPLAB SUPABASE DATABASE TEST")
print("====================================")

print("Database engine:", connection.vendor)

assert connection.vendor == "postgresql", "Wrong database engine"

connection.ensure_connection()
print("[PASS] Database connection")

with transaction.atomic():

    test_user = User.objects.create_user(
        username=f"db_test_{uuid4().hex[:10]}"
    )

    test_user_id = test_user.pk

    print("[PASS] User created:", test_user.username)

    exercise = Exercise.objects.create(
        name="Bench Press - Connection Test",
        muscle_group="Chest",
        description="Temporary Supabase test",
        created_by=test_user
    )

    test_id = exercise.pk

    print("[PASS] Exercise created")

    saved_exercise = Exercise.objects.get(pk=test_id)

    assert saved_exercise.name == exercise.name
    assert saved_exercise.created_by_id == test_user_id

    print("[PASS] Exercise retrieved")
    print("Exercise ID:", saved_exercise.id)
    print("Exercise name:", saved_exercise.name)
    print("Muscle group:", saved_exercise.muscle_group)
    print("Created by:", saved_exercise.created_by.username)

    print("[PASS] Foreign key relationship")

    transaction.set_rollback(True)

assert not Exercise.objects.filter(pk=test_id).exists()
assert not User.objects.filter(pk=test_user_id).exists()

print("[PASS] Transaction rollback")
print("[PASS] Temporary records removed")

print("====================================")
print("ALL DATABASE TESTS PASSED")
print("====================================")
