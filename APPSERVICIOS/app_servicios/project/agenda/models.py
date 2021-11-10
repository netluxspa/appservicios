from django.db import models
from main.models import Oferente, Servicio, Box, Demandante
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
import datetime
from django.contrib.postgres.constraints import ExclusionConstraint
from django.contrib.postgres.fields import DateTimeRangeField, RangeOperators
from main.serializers import OferenteSerializer
# Create your models here.

class Disponibilidad(models.Model):
    box = models.ForeignKey(Box, related_name='disponibilidad', on_delete=models.CASCADE)
    oferente = models.ForeignKey(Oferente, related_name='disponibilidad', on_delete=models.CASCADE)
    inicio = models.DateTimeField(auto_now=False, auto_now_add=False)
    final = models.DateTimeField(auto_now=False, auto_now_add=False)
    cancel = models.BooleanField(default=False)


    def intervalo(self):
        minutes_diff = (self.final - self.inicio).total_seconds() / 60.0
        return minutes_diff

    def top(self):

        origin = datetime.datetime(self.inicio.year, self.inicio.month, self.inicio.day, 00, 00)
        minutes_diff = (self.inicio.replace(tzinfo=None) - origin).total_seconds() / 60.0
        return minutes_diff
    
    @property
    def periodos_disponibles(self):
        return []
       


class Cita(models.Model):
    demandante = models.ForeignKey(Demandante, related_name='cita', on_delete=models.CASCADE)
    inicio = models.DateTimeField(auto_now=False, auto_now_add=False) 
    disponibilidad = models.ForeignKey(Disponibilidad, related_name='cita', on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, related_name='cita', on_delete=models.CASCADE)
    cancel = models.BooleanField(default=False)
    confirmate = models.BooleanField(default=True)
    observacion = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ('-inicio',)

    def oferente(self):
        data = self.disponibilidad.oferente
        serializer = OferenteSerializer(data, many=False)
        return serializer.data

    def intervalo(self):
        return self.servicio.tiempo
    @property
    def final(self):
        return  self.inicio +  datetime.timedelta(minutes=self.servicio.tiempo) 

    def top(self):
        origin = datetime.datetime(self.inicio.year, self.inicio.month, self.inicio.day, 00, 00)
        minutes_diff = (self.inicio.replace(tzinfo=None) - origin).total_seconds() / 60.0
        return minutes_diff

    def top_disponibilidad(self):
        origin = self.disponibilidad.inicio
        minutes_diff = (self.inicio.replace(tzinfo=None) - origin.replace(tzinfo=None)).total_seconds() / 60.0
        return minutes_diff

    # RESTRICCIONES
    # El servicio debe estar comprendido entre los servicios del oferente correspondiente a la disponibilidad 
    # No deben intercalarse las citas de la misma disponibilidad
    # La cita debe ejecutarse dentro del rango de disponibilidad    

class TestModel(models.Model):
    codigo = models.CharField(max_length=100)

    class Meta:
        ordering = ('codigo',)


