
from rest_framework import serializers
from .models import *

class PaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagina
        fields = '__all__'

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields =  ('pagina','rut','nombre','apellido','nombre_completo',)

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'


class OferenteSerializer(serializers.ModelSerializer):
    persona = PersonaSerializer(many=False)
    contacto = ContactoSerializer(many=False)
    class Meta:
        model = Oferente
        fields = '__all__'

class DemandanteSerializer(serializers.ModelSerializer):
    persona = PersonaSerializer(many=False)
    contacto = ContactoSerializer(many=False)
    class Meta:
        model = Demandante
        fields = '__all__'

    def create(self, validated_data):
        persona = validated_data.pop('persona')
        contacto = validated_data.pop('contacto')
        persona_instance, created = Persona.objects.get_or_create(rut=persona['rut'], nombre=persona['nombre'], apellido=persona['apellido'], pagina=persona['pagina'])
        contacto_instance = Contacto.objects.create(email=contacto['email'], fono=contacto['fono'])
        demandante_instance = Demandante.objects.create(**validated_data, persona=persona_instance, contacto=contacto_instance)
        return demandante_instance

class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Box
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = '__all__'

class CentroSerializer(serializers.ModelSerializer):
    direccion = DireccionSerializer(many=False, read_only=True)
    contacto = ContactoSerializer(many=False, read_only=True)
    class Meta:
        model = Centro
        fields = '__all__'