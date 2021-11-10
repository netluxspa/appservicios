from django.db import models

# Create your models here.

class Pagina(models.Model):
    codigo = models.CharField(max_length=100, primary_key=True)
    titulo = models.CharField(null=True, max_length=100)
    subtitulo = models.CharField(null=True, max_length=100)
    extra_action_info = models.CharField(null=True, max_length=100)


class UserPagina(models.Model):
    email = models.EmailField(max_length=254)
    pagina = models.ForeignKey(Pagina, related_name='users', on_delete=models.CASCADE)
    password = models.CharField(max_length=200)

    class Meta:
        unique_together = (('pagina', 'email'),) 
        index_together = (('pagina', 'email'),)


    def save(self,*args, **kwargs):
        self.password = make_password(self.password)
        super(UserPagina, self).save(*args, **kwargs)


class Direccion(models.Model):
    pais = models.CharField(max_length=200)
    region = models.CharField(max_length=200)
    comuna = models.CharField(max_length=200)
    calle = models.CharField(max_length=200)
    numero = models.IntegerField()
    adicional = models.CharField(max_length=200, null=True, blank=True)

class Contacto(models.Model):
    fono = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)


class Centro(models.Model):
    pagina = models.ForeignKey(Pagina, related_name='centros', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    direccion =  models.OneToOneField(Direccion, related_name='centro', on_delete=models.CASCADE)
    contacto = models.OneToOneField(Contacto, related_name='centro', on_delete=models.CASCADE)

class Box(models.Model):
    centro = models.ForeignKey(Centro, related_name='boxs', on_delete=models.CASCADE)
    codigo  = models.CharField(max_length=200)


class Area(models.Model):
    pagina = models.ForeignKey(Pagina, related_name='areas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)



class Servicio(models.Model):
    area = models.ForeignKey(Area, related_name='servicios', on_delete=models.CASCADE)
    tiempo = models.IntegerField()
    titulo = models.CharField(max_length=200)
    agendable = models.BooleanField(default=False)

    # RESTRICCIONS:
    # No se debe modificar el servicio si esque su tiempo modificado crea superposiciones.


class CentroServicios(models.Model):
    centro = models.ForeignKey(Centro, related_name='servicios', on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, related_name='centros', on_delete=models.CASCADE)


class Persona(models.Model):
    pagina = models.ForeignKey(Pagina, related_name='personas', on_delete=models.CASCADE)
    rut = models.CharField(max_length=200)
    nombre = models.CharField(max_length=200)
    apellido = models.CharField(max_length=200)

    class Meta:
        unique_together = (('pagina', 'rut'),) 
        index_together = (('pagina', 'rut'),)

    def nombre_completo(self):
        return self.nombre + ' ' + self.apellido
   


class Oferente(models.Model):
    persona = models.OneToOneField(Persona, related_name='oferente', on_delete=models.CASCADE)
    contacto = models.OneToOneField(Contacto, related_name='oferente', on_delete=models.CASCADE)

class Demandante(models.Model):
    persona = models.OneToOneField(Persona, related_name='demandante', on_delete=models.CASCADE)
    contacto = models.OneToOneField(Contacto, related_name='demandante', on_delete=models.CASCADE)



class OferenteCentro(models.Model):
    centro = models.ForeignKey(Centro, related_name='oferentes', on_delete=models.CASCADE)
    oferente = models.ForeignKey(Oferente, related_name='centros', on_delete=models.CASCADE)


class OferenteServicio(models.Model):
    oferente = models.ForeignKey(Oferente, related_name='servicios', on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, related_name='oferentes', on_delete=models.CASCADE)
