from rest_framework import  viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from main.serializers import *
from main.models import *
from .serializers import *
import datetime
import time

from django.db.models import OuterRef, Subquery, Q, F
from django.db.models.functions import Coalesce


# Create your views here.

def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None



@api_view(['POST'])
def send_schedule(request):

    try:
        init = datetime.datetime.strptime(request.data['init'], '%Y-%m-%d')
        finish = datetime.datetime.strptime(request.data['finish'], '%Y-%m-%d')
    except:
        init = None
        finish = None

    if init and finish:
        i = init
        count = 0

        response = []

        while i <= finish:

            disponibilidades = Disponibilidad.objects.filter(inicio__date=i.date(), cancel=False)
            disponibilidades_serializer = DisponibilidadSerializer(disponibilidades, many=True)

            add = {
                "day": {"day": count, "date": i.date()},
                "disponibilidades": disponibilidades_serializer.data
            }
            response.append(add)
            i = i + datetime.timedelta(days=1)
            count += 1

        
 

        return Response(response)



@api_view(['POST'])
def send_client_calendar(request):


    def validate():
        errors = {}
        result = True
        try:
            Servicio.objects.get(pk=request.data["servicio"])
        except:
            result = False
            errors["servicio"] = ['Debe seleccionar un servicio']
        return {"result": result, "errors": errors}

    validate = validate()
    if validate["result"] == False:
        return Response(validate["errors"],  status=status.HTTP_400_BAD_REQUEST)
    else:
        servicio_data = Servicio.objects.get(pk=request.data["servicio"])
        servicio_serializer = ServicioSerializer(servicio_data, many=False)

        qs = Disponibilidad.objects.filter(
                cancel=False,
                inicio__date__gte= datetime.date.today() + datetime.timedelta(days=1), 
                inicio__lte=F('final') - datetime.timedelta(minutes=servicio_data.tiempo),
                oferente__in= OferenteServicio.objects.filter(servicio=request.data["servicio"]).values('oferente'),
            )

        disp_ok = []

        for i in qs:
            citas = Cita.objects.filter(disponibilidad=i, cancel=False).order_by('inicio')
            if len(citas) == 0:
                disp_ok.append(i.inicio.date())
            else:
                if i.inicio <= citas[0].inicio - datetime.timedelta(minutes=servicio_data.tiempo):
                    disp_ok.append(i.inicio.date())
                elif i.final >= citas[len(citas) - 1].final + datetime.timedelta(minutes=servicio_data.tiempo):
                    disp_ok.append(i.inicio.date())
                else:
                    for j in range(0, len(citas)):
                        if j < len(citas) - 1:
                            if citas[j + 1].inicio >= citas[j].final + datetime.timedelta(minutes=servicio_data.tiempo):
                                disp_ok.append(i.inicio.date())
                                

        disp_ok = list(set(disp_ok))

        return Response({"disponibilidades":disp_ok})

@api_view(['POST'])
def send_client_options(request):

    def validate():
        errors = {}
        data = {}
        result = True

        try:
            date = request.data["date"]
            data["date"] = date

        except:
            result = False
            errors["date"] = ['Debe seleccionar un dia']

        try:
            data["servicio"] = Servicio.objects.get(pk=request.data["servicio"])
            
        except:
            result = False
            errors["servicio"] = ["Debe seleccionar un servicio"]

        return {"result": result, "errors": errors, "data": data}

    validate = validate()
    if validate["result"] == False:
        return Response(validate["errors"],  status=status.HTTP_400_BAD_REQUEST)
    else:
        date = validate["data"]["date"]
        servicio = validate["data"]["servicio"]
        disponibilidades = Disponibilidad.objects.filter(
                cancel=False,
                inicio__date=date,
                oferente__in= OferenteServicio.objects.filter(servicio=servicio.id).values('oferente'),
            )

        response = {
            "date": date,
            "options": []
        }
        
        for i in disponibilidades: 
            if  i.inicio <= i.final - datetime.timedelta(minutes=servicio.tiempo):
                citas = Cita.objects.filter(disponibilidad=i, cancel=False).order_by('inicio')
               
                if len(citas) == 0:
                    time = 0
                    while i.final > i.inicio + datetime.timedelta(minutes=time):
                        add = {"form": {}, "extra": {}}
                        add["form"]["inicio"]=i.inicio + datetime.timedelta(minutes=time) 
                        add["form"]["disponibilidad"]=i.id
                        add["form"]["servicio"]= servicio.id
                        add["extra"]["oferenteID"] = i.oferente.id
                        add["extra"]["oferenteName"] = i.oferente.persona.nombre + ' ' + i.oferente.persona.apellido
                        response["options"].append(add)
                        time += servicio.tiempo
                else:

                    # LIBERTAD AL CLIENTE -  POSIBLE PROBLEMA RESPECTOA VENTANAS DE TIEMPO
                    # c = 1
                    # while  i.inicio + datetime.timedelta(minutes=servicio.tiempo*c) <= citas[0].inicio:
                    #     add = {"form": {}, "extra": {}}
                    #     add["form"]["inicio"]=i.inicio + datetime.timedelta(minutes=servicio.tiempo*(c - 1)) 
                    #     add["form"]["disponibilidad"]=i.id
                    #     add["form"]["servicio"]= servicio.id
                    #     add["extra"]["oferenteID"] = i.oferente.id
                    #     add["extra"]["oferenteName"] = i.oferente.persona.nombre + i.oferente.persona.apellido
                    #     response["options"].append(add)
                    #     c+=1

                    # ORIENTADO A LA ELIMINACION DE VENTANAS DE TIEMPO 
                    if  i.inicio + datetime.timedelta(minutes=servicio.tiempo) <= citas[0].inicio:
                        add = {"form": {}, "extra": {}}
                        add["form"]["inicio"]=citas[0].inicio - datetime.timedelta(minutes=servicio.tiempo) 
                        add["form"]["disponibilidad"]=i.id
                        add["form"]["servicio"]= servicio.id
                        add["extra"]["oferenteID"] = i.oferente.id
                        add["extra"]["oferenteName"] = i.oferente.persona.nombre + i.oferente.persona.apellido
                        response["options"].append(add)
                        


                    for j in range(0, len(citas)):
                        if j < len(citas) - 1:
                            c2 = 1
                            while citas[j + 1].inicio >= citas[j].final + datetime.timedelta(minutes=servicio.tiempo*c2):
                                add = {"form": {}, "extra": {}}
                                add["form"]["inicio"]=citas[j].final
                                add["form"]["disponibilidad"]=i.id
                                add["form"]["servicio"]= servicio.id
                                add["extra"]["oferenteID"] = i.oferente.id
                                add["extra"]["oferenteName"] = i.oferente.persona.nombre + i.oferente.persona.apellido
                                response["options"].append(add)
                                c2+=1
                    # LIBERTAD AL CLIENTE -  POSIBLE PROBLEMA RESPECTOA VENTANAS DE TIEMPO
                    # c3 = 1
                    # while citas[len(citas) - 1].final +  datetime.timedelta(minutes=servicio.tiempo*c3) <= i.final:
                    #     add = {"form": {}, "extra": {}}
                    #     add["form"]["inicio"]=citas[len(citas) - 1].final + datetime.timedelta(minutes=servicio.tiempo*(c3 - 1))
                    #     add["form"]["disponibilidad"]=i.id
                    #     add["form"]["servicio"]= servicio.id
                    #     add["extra"]["oferenteID"] = i.oferente.id
                    #     add["extra"]["oferenteName"] = i.oferente.persona.nombre + i.oferente.persona.apellido
                    #     response["options"].append(add)
                    #     c3+=1
                    
                    # ORIENTADO A LA ELIMINACION DE VENTANAS DE TIEMPO 
                    if citas[len(citas) - 1].final +  datetime.timedelta(minutes=servicio.tiempo) <= i.final:
                        add = {"form": {}, "extra": {}}
                        add["form"]["inicio"]=citas[len(citas) - 1].final
                        add["form"]["disponibilidad"]=i.id
                        add["form"]["servicio"]= servicio.id
                        add["extra"]["oferenteID"] = i.oferente.id
                        add["extra"]["oferenteName"] = i.oferente.persona.nombre + i.oferente.persona.apellido
                        response["options"].append(add)


        return Response(response)


class DisponibilidadViewSet(viewsets.ModelViewSet):
    queryset = Disponibilidad.objects.all()
    serializer_class = DisponibilidadSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('cancel',)


    
   

class CitaCreatedByDemandanteViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaCreatedByDemandanteSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('demandante',)

    def create(self, request, *args, **kwargs):
        persona = request.data.get('demandante').get('persona')
        contacto = request.data.get('demandante').get('contacto')
        persona_instance = get_or_none(Persona, rut=persona.get('rut'), pagina=persona.get('pagina'))
        if persona_instance == None:
            pagina = get_or_none(Pagina, codigo=persona.get('pagina'))
            if pagina:
                persona_instance =  Persona.objects.create(
                    rut=persona.get('rut'),
                    nombre=persona.get('nombre'),
                    apellido=persona.get('apellido'),
                    pagina=pagina,
                )
            else:
                return Response({'pagina': 'pagina invalida'},  status=status.HTTP_400_BAD_REQUEST)
        
        demandante = get_or_none(Demandante, persona=persona_instance.id)
        if demandante:
            demandante.contacto.fono = contacto.get('fono')
            demandante.contacto.email = contacto.get('email')
            demandante.contacto.save()
        else:
            demandante = Demandante.objects.create(
                persona=persona_instance,
                contacto=Contacto.objects.create(
                    fono=contacto.get('fono'),
                    email=contacto.get('email')
                )
            )
        
        cita_serializer = CitaSerializer(data={
            "disponibilidad": request.data.get('disponibilidad'),
            "demandante": demandante.id,
            "inicio": request.data.get('inicio'),
            "servicio": request.data.get('servicio'),
        })

        if cita_serializer.is_valid():
            cita_serializer.save()
            return Response(cita_serializer.data)
        else:
         return Response(cita_serializer.errors,  status=status.HTTP_400_BAD_REQUEST)


        
    

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    filter_backends = (DjangoFilterBackend,)
    # permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('demandante',)