from django.db import models
from django.db.models import  Q
from main.models import Servicio
import uuid


def scramble_uploaded_filename(instanece, filename):
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

# Create your models here.

# LLamese seccion a una parte de una web la cual está enfocada a promocionar un servicio
class Seccion(models.Model):
    servicio = models.OneToOneField(Servicio, related_name='seccion', on_delete=models.CASCADE)

    def __str__(self):
        return self.servicio.area.pagina.codigo
    

class Container(models.Model):
    seccion = models.ForeignKey(Seccion, related_name='containers', on_delete=models.CASCADE)
    position = models.IntegerField(null=True, blank=True)
    
    class Meta:
        ordering = ('position',)

    def __str__(self):
        return self.seccion.servicio.area.pagina.codigo + ' ' + str(self.position)

#LOS SIGUIENTES MODELOS TIENEN ESTRICTA RELACION CON LAS CARDS DEL FRONTEND.

class MainCard(models.Model):
    container = models.OneToOneField(Container, related_name='main_card', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    subtitulo = models.CharField(max_length=200)
    imagen_titulo = models.ImageField(upload_to=scramble_uploaded_filename, null=True, blank=True)
    parrafo = models.TextField()
    imagen_main = models.ImageField(upload_to=scramble_uploaded_filename, null=True, blank=True)


class SecondaryCard(models.Model):
    container = models.OneToOneField(Container, related_name='secondary_card', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    parrafo = models.TextField()
    imagen_main = models.ImageField(upload_to=scramble_uploaded_filename, null=True, blank=True)



class TextCard(models.Model):
    container = models.OneToOneField(Container, related_name='text_card', on_delete=models.CASCADE)
    titulo_main = models.CharField(max_length=200, null=True, blank=True)
    titulo1 = models.CharField(max_length=200)
    parrafo1 = models.TextField()
    titulo2 = models.CharField(max_length=200)
    parrafo2 = models.TextField()
    titulo3 = models.CharField(max_length=200)
    parrafo3 = models.TextField()

class ActionCard(models.Model):
    container = models.OneToOneField(Container, related_name='action_card', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200, null=True, blank=True)
    parrafo = models.TextField()



