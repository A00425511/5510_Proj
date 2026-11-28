from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Profile

User = get_user_model()


class ProfileProvisioningTests(TestCase):

    def test_new_user_has_profile(self):
        user = User.objects.create_user(
            username='test_athlete'
        )

        self.assertTrue(
            Profile.objects.filter(user=user).exists()
        )

    def test_default_role_is_athlete(self):
        user = User.objects.create_user(
            username='test_default_role'
        )

        self.assertEqual(user.profile.role, 'athlete')

    def test_user_update_does_not_duplicate_profile(self):
        user = User.objects.create_user(
            username='test_duplicate'
        )

        user.first_name = 'Updated'
        user.save()

        self.assertEqual(
            Profile.objects.filter(user=user).count(),
            1
        )

    def test_existing_role_is_preserved(self):
        user = User.objects.create_user(
            username='test_coach'
        )

        profile = user.profile
        profile.role = 'coach'
        profile.save()

        user.first_name = 'Coach'
        user.save()

        profile.refresh_from_db()

        self.assertEqual(profile.role, 'coach')