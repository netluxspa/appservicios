
from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('disponibilidad', DisponibilidadViewSet)
router.register('cita', CitaViewSet)
router.register('cita-by-demandante', CitaCreatedByDemandanteViewSet)




urlpatterns = [
    path('', include(router.urls)),
    path('get-schedule/', send_schedule, name='get-schedule'),
    path('get-calendar-client/', send_client_calendar, name='get-calendar-client'),
    path('get-client-options/', send_client_options, name='get-client-options'),

]
