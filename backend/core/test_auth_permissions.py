from django.contrib.auth import get_user_model
from django.test import Client, TestCase

from .models import Profile

User = get_user_model()


class AuthPermissionTests(TestCase):

    def setUp(self):
        self.password = 'RepLabTest!8294'

        self.athlete = User.objects.create_user(
            username='test_athlete',
            email='athlete@example.com',
            password=self.password,
        )

        self.coach = User.objects.create_user(
            username='test_coach',
            email='coach@example.com',
            password=self.password,
        )

        self.coach.profile.role = 'coach'
        self.coach.profile.save()

        self.client = Client(enforce_csrf_checks=True)

    def get_csrf_token(self):
        response = self.client.get('/api/auth/csrf/')
        self.assertEqual(response.status_code, 200)
        return response.json()['csrfToken']

    def login_athlete(self):
        token = self.get_csrf_token()

        response = self.client.post(
            '/api/auth/login/',
            {
                'username': self.athlete.username,
                'password': self.password,
            },
            content_type='application/json',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(
            response.status_code, 200, response.content
        )

        self.assertIn('_auth_user_id', self.client.session)

        return response

    # AUTH-01
    def test_guest_cannot_access_profile(self):
        response = self.client.get('/api/profiles/me/')

        self.assertIn(response.status_code, [401, 403])

    # AUTH-02
    def test_login_and_profile_access(self):
        self.login_athlete()

        user_response = self.client.get('/api/auth/user/')
        self.assertEqual(user_response.status_code, 200)

        response = self.client.get('/api/profiles/me/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['role'], 'athlete')
        self.assertEqual(
            response.json()['user'], self.athlete.pk
        )

    # AUTH-03
    def test_login_requires_csrf(self):
        response = self.client.post(
            '/api/auth/login/',
            {
                'username': self.athlete.username,
                'password': self.password,
            },
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 403)

    # AUTH-04
    def test_athlete_cannot_change_role(self):
        self.login_athlete()
        token = self.get_csrf_token()

        profile = self.athlete.profile

        response = self.client.patch(
            f'/api/profiles/{profile.pk}/',
            {
                'role': 'admin',
                'bio': 'Updated athlete bio',
            },
            content_type='application/json',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(response.status_code, 200)

        profile.refresh_from_db()

        self.assertEqual(profile.role, 'athlete')
        self.assertEqual(
            profile.bio, 'Updated athlete bio'
        )

    # AUTH-05
    def test_cannot_access_another_profile(self):
        self.login_athlete()
        token = self.get_csrf_token()

        url = f'/api/profiles/{self.coach.profile.pk}/'

        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

        response = self.client.patch(
            url,
            {'bio': 'Unauthorized update'},
            content_type='application/json',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(response.status_code, 404)

        self.coach.profile.refresh_from_db()
        self.assertNotEqual(
            self.coach.profile.bio,
            'Unauthorized update',
        )

    # AUTH-06
    def test_direct_profile_creation_and_deletion_disabled(self):
        self.login_athlete()
        token = self.get_csrf_token()

        response = self.client.post(
            '/api/profiles/',
            {'role': 'admin'},
            content_type='application/json',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(response.status_code, 405)

        response = self.client.delete(
            f'/api/profiles/{self.athlete.profile.pk}/',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(response.status_code, 405)

    # AUTH-07
    def test_registration_assigns_safe_default_role(self):
        token = self.get_csrf_token()

        response = self.client.post(
            '/api/auth/registration/',
            {
                'username': 'new_athlete',
                'email': 'newathlete@example.com',
                'password1': self.password,
                'password2': self.password,
                'role': 'admin',
            },
            content_type='application/json',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(
            response.status_code, 201, response.content
        )

        user = User.objects.get(username='new_athlete')
        profile = Profile.objects.get(user=user)

        self.assertEqual(profile.role, 'athlete')

    # AUTH-08
    def test_logout_removes_session_access(self):
        self.login_athlete()
        token = self.get_csrf_token()

        response = self.client.post(
            '/api/auth/logout/',
            HTTP_X_CSRFTOKEN=token,
        )

        self.assertEqual(response.status_code, 200)

        response = self.client.get('/api/profiles/me/')

        self.assertIn(response.status_code, [401, 403])