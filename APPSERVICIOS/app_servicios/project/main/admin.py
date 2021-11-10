from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Contacto)
admin.site.register(Area)
admin.site.register(OferenteServicio)
admin.site.register(Servicio)
admin.site.register(Persona)
admin.site.register(Direccion)
admin.site.register(Pagina)
admin.site.register(Oferente)
admin.site.register(Demandante)
admin.site.register(OferenteCentro)
admin.site.register(Centro)
admin.site.register(Box)


