
from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()

router.register('pagina', PaginaViewSet)
router.register('oferente', OferenteViewSet)
router.register('demandante', DemandanteViewSet)
router.register('box', BoxViewSet)
router.register('servicio', ServicioViewSet)
router.register('centro', CentroViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
