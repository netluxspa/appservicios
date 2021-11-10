from rest_framework import serializers
from main.models import Pagina
from main.serializers import CentroSerializer, AreaSerializer, ServicioSerializer
from .models import *

class MainCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCard
        fields = '__all__'


class SecondaryCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecondaryCard
        fields = '__all__'


class TextCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextCard
        fields = '__all__'

class ActionCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionCard
        fields = '__all__'


class ContainerSerializer(serializers.ModelSerializer):

    main_card = MainCardSerializer(many=False, read_only=True)
    action_card = ActionCardSerializer(many=False, read_only=True)
    secondary_card = SecondaryCardSerializer(many=False, read_only=True)
    text_card = TextCardSerializer(many=False, read_only=True)

    class Meta:
        model = Container
        fields = '__all__'

    def create(self, validated_data):
        seccion =  validated_data.get('seccion')
        position = len(Container.objects.filter(seccion=seccion))
        container_instance = Demandante.objects.create(**validated_data, position=position)
        return container_instance


class SeccionSerializer(serializers.ModelSerializer):

    containers = ContainerSerializer(many=True, read_only=True)

    class Meta:
        model = Seccion
        fields = '__all__'



class PaginaSerializer(serializers.ModelSerializer):

    centros = CentroSerializer(many=True, read_only=True)
    secciones = serializers.SerializerMethodField('get_secciones_serializer')

    class Meta:
        model = Pagina
        fields = ('codigo', 'titulo', 'subtitulo', 'extra_action_info', 'centros', 'secciones', )

    def get_secciones_serializer(self, obj):
        serializer_context = {'request': self.context.get('request')}
        secciones =  Seccion.objects.filter(servicio__area__pagina=obj, servicio__agendable=True)
        serializer = SeccionSerializer(secciones, many=True, context=serializer_context)
        return serializer.data