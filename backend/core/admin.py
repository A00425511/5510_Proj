from django.contrib import admin
from .models import Profile, Exercise, PersonalRecord, Workout, WorkoutExercise, Program, PaymentPlan

class ProfileAdmin(admin.ModelAdmin):
    pass

admin.site.register(Profile, ProfileAdmin)

class ExerciseAdmin(admin.ModelAdmin):
    pass

admin.site.register(Exercise, ExerciseAdmin)

class PersonalRecordAdmin(admin.ModelAdmin):
    pass

admin.site.register(PersonalRecord, PersonalRecordAdmin)

class WorkoutAdmin(admin.ModelAdmin):
    pass

admin.site.register(Workout, WorkoutAdmin)

class WorkoutExerciseAdmin(admin.ModelAdmin):
    pass    

admin.site.register(WorkoutExercise, WorkoutExerciseAdmin)

class ProgramAdmin(admin.ModelAdmin):
    pass

admin.site.register(Program, ProgramAdmin)

class PaymentPlanAdmin(admin.ModelAdmin):
    pass

admin.site.register(PaymentPlan, PaymentPlanAdmin)




