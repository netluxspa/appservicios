from rest_framework import  viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .serializers import *
import time
from rest_framework import  viewsets, status
from rest_framework.response import Response


# Create your views here.


class PaginaViewSet(viewsets.ModelViewSet):
    queryset = Pagina.objects.all()
    serializer_class = PaginaSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('codigo',)


class OferenteViewSet(viewsets.ModelViewSet):
    queryset = Oferente.objects.all()
    serializer_class = OferenteSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)

class DemandanteViewSet(viewsets.ModelViewSet):
    queryset = Demandante.objects.all()
    serializer_class = DemandanteSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('persona__rut',)
    # permission_classes = (OnlyAdminPerPag,)

class BoxViewSet(viewsets.ModelViewSet):
    queryset = Box.objects.all()
    serializer_class = BoxSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)



class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('agendable',)

    

class CentroViewSet(viewsets.ModelViewSet):
    queryset = Centro.objects.all()
    serializer_class = CentroSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
