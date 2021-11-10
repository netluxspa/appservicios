from django.shortcuts import render
from rest_framework import  viewsets, status
from django_filters.rest_framework import DjangoFilterBackend
from main.models import Pagina
from .models import *
from .serializers import *

# Create your views here.



class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all()
    serializer_class = SeccionSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('servicio__area__pagina__codigo',)

class PaginaViewSet(viewsets.ModelViewSet):
    queryset = Pagina.objects.all()
    serializer_class = PaginaSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('codigo',)


class MainCardViewSet(viewsets.ModelViewSet):
    queryset = MainCard.objects.all()
    serializer_class = MainCardSerializer
    # filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    # filter_fields = ('servicio__area__pagina__codigo',)
