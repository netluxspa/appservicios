
from rest_framework import serializers
from .models import *
import datetime
from main.models import OferenteCentro, OferenteServicio, Persona, Demandante
from main.serializers import OferenteSerializer, BoxSerializer, DemandanteSerializer, ServicioSerializer
from django.db.models import F
from django.db.models import Q


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


class Disponibilidad2Serializer(serializers.ModelSerializer):
    oferente_detail = OferenteSerializer(source='oferente', many=False, read_only=True)
    box_detail = BoxSerializer(source='box', many=False, read_only=True)
    class Meta:
        model = Disponibilidad
        fields = ('id', 'box', 'oferente', 'oferente_detail', 'periodos_disponibles', 'box_detail', 'inicio', 'final', 'cancel', 'intervalo', 'top', 'cita',)




class CitaCreatedByDemandanteSerializer(serializers.ModelSerializer):
    demandante = DemandanteSerializer(many=False)

    class Meta:
        model = Cita
        fields =  '__all__'
    
    




class CitaSerializer(serializers.ModelSerializer):
    disponibilidad_detail= Disponibilidad2Serializer(source='disponibilidad', many=False, read_only=True)
    demandante_detail = DemandanteSerializer(source='demandante', read_only=True, many=False)
    servicio_detail = ServicioSerializer(source='servicio', read_only=True, many=False)
    
    direccion = serializers.SerializerMethodField('get_direccion_char')

    class Meta:
        model = Cita
        fields = ('id', 'demandante','top_disponibilidad', 'direccion', 'observacion', 'final', 'demandante_detail', 'inicio' , 'servicio_detail', 'disponibilidad' ,'disponibilidad_detail' ,'servicio' ,'cancel' ,'confirmate' ,'intervalo' ,'top',)


    def get_direccion_char(self, obj):
        direccion = obj.disponibilidad.box.centro.direccion
        response =  direccion.calle + ' ' + str(direccion.numero)  + (' ' +  direccion.adicional if direccion.adicional  else '') + ' ' + direccion.comuna+ ' ' + direccion.region
        return response


    def validate(self, data):


        # RESTRICCIONES
        # El oferente y el demandante no pueden ser la misma persona 
        if data['disponibilidad'].oferente.persona == data['demandante'].persona:
            raise serializers.ValidationError({"cita": 'El oferente y el demandante no pueden ser la misma persona'})

        # El servicio debe estar comprendido entre los servicios del oferente correspondiente a la disponibilidad 
        if len(OferenteServicio.objects.filter(oferente=data['disponibilidad'].oferente, servicio=data['servicio'])) == 0:
            raise serializers.ValidationError({"oferente_servicio": 'El oferente seleccionado no presta el servicio seleccionado'})

        # No deben intercalarse las citas de la misma disponibilidad

        if len(Cita.objects.filter(disponibilidad=data['disponibilidad'], cancel=False, confirmate=True).exclude(id=(self.instance.id if self.instance else None)).exclude(inicio__lte=data['inicio'] - datetime.timedelta(minutes=1)*F('servicio__tiempo')).exclude(inicio__gte=(data['inicio'] +  datetime.timedelta(minutes=data['servicio'].tiempo)))):
            raise serializers.ValidationError({"cita": 'Este horario ya tiene una cita agendada'})


        # La cita debe ejecutarse dentro del rango de disponibilidad 

        if data['disponibilidad'].cancel:
            raise serializers.ValidationError({"disponibilidad": 'Este horario ya no está disponible .'})

        if (data['inicio'] < data['disponibilidad'].inicio) | (data['inicio'] > data['disponibilidad'].final) | (data['inicio'] +  datetime.timedelta(minutes=data['servicio'].tiempo) > data['disponibilidad'].final) | (data['inicio'] +  datetime.timedelta(minutes=data['servicio'].tiempo) < data['disponibilidad'].inicio):
            raise serializers.ValidationError({"disponibilidad": 'Este horario no está disponible '})


        return data



class FilterCitaCancelSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(cancel=True)
        return super(FilterCitaCancelSerializer, self).to_representation(data)

class CitaCancelSerializer(serializers.ModelSerializer):
    disponibilidad_detail= Disponibilidad2Serializer(source='disponibilidad', many=False, read_only=True)
    demandante_detail = DemandanteSerializer(source='demandante', read_only=True, many=False)
    servicio_detail = ServicioSerializer(source='servicio', read_only=True, many=False)
    class Meta:
        list_serializer_class = FilterCitaCancelSerializer
        model = Cita
        fields = ('id', 'demandante','top_disponibilidad', 'observacion', 'final', 'demandante_detail', 'inicio' , 'servicio_detail', 'disponibilidad' ,'disponibilidad_detail' ,'servicio' ,'cancel' ,'confirmate' ,'intervalo' ,'top',)


class FilterCitaNoCancelSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(cancel=False)
        return super(FilterCitaNoCancelSerializer, self).to_representation(data)

class CitaNoCancelSerializer(serializers.ModelSerializer):
    disponibilidad_detail= Disponibilidad2Serializer(source='disponibilidad', many=False, read_only=True)
    demandante_detail = DemandanteSerializer(source='demandante', read_only=True, many=False)
    servicio_detail = ServicioSerializer(source='servicio', read_only=True, many=False)
    class Meta:
        list_serializer_class = FilterCitaNoCancelSerializer
        model = Cita
        fields = ('id', 'demandante','top_disponibilidad', 'observacion', 'final', 'demandante_detail', 'inicio' , 'servicio_detail', 'disponibilidad' ,'disponibilidad_detail' ,'servicio' ,'cancel' ,'confirmate' ,'intervalo' ,'top',)


class DisponibilidadSerializer(serializers.ModelSerializer):
    cita = CitaNoCancelSerializer(many=True, read_only=True)
    oferente_detail = OferenteSerializer(source='oferente', many=False, read_only=True)
    box_detail = BoxSerializer(source='box', many=False, read_only=True)
    cita_cancel = CitaCancelSerializer(source='cita', many=True, read_only=True)
    class Meta:
        model = Disponibilidad
        fields = ('id', 'box', 'oferente', 'oferente_detail', 'periodos_disponibles', 'box_detail', 'inicio', 'final', 'cancel', 'intervalo', 'top', 'cita', 'cita_cancel', )


    def validate(self, data):

        
        # FINAL MAYOR AL INICIO
        if data['inicio'] >= data['final']:
            raise serializers.ValidationError({"inicio_final": 'El final debe ser posterior al inicio'})

        # SUPERPOSICION 
        elif len(Disponibilidad.objects.filter( Q(oferente=data['oferente']) | Q(box=data['box']), cancel=False ).exclude( inicio__gt=data['final'] ).exclude( final__lt=data['inicio'] ).exclude(id=(self.instance.id if self.instance else None)))>0:
            raise serializers.ValidationError({"superposicion": 'Hay superperposicion'})

        #POSEE CITAS 
        elif self.instance and len(  Cita.objects.filter(disponibilidad=self.instance.id, cancel=False).exclude( inicio__gte=data['inicio'],  servicio__tiempo__lte=((data['final']-data['inicio']).total_seconds() / 60))  ) > 0:
            raise serializers.ValidationError({"citas_agendadas": 'No se puede modificar esta disponibilidad, debido a que ya tiene citas.'})


        elif self.instance and data['cancel'] and len(Cita.objects.filter(disponibilidad=self.instance.id, cancel=False)) > 0:
            raise serializers.ValidationError({"citas_agendadas": 'No se puede cancelar esta disponibilidad, debido a que ya tiene citas.'})
            
        # DIAS DISTINTOS 
        elif data["inicio"].date() != data["final"].date():
            raise serializers.ValidationError({"dia_distintos": 'El inicio y el final de la disponibilidad deben ser el mismo día.'})

        return data