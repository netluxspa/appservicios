
from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('seccion', SeccionViewSet)
router.register('pagina', PaginaViewSet)
router.register('maincard', MainCardViewSet)





urlpatterns = [
    path('', include(router.urls)),
]
