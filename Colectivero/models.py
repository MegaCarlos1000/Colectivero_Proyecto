from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Aquí puedes agregar otros campos obligatorios, si es necesario

    objects = UserManager()

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )

    def __str__(self):
        return self.email

# Modelo para los Colectivos
class Colectivo(models.Model):
    patente = models.CharField(max_length=10, unique=True)
    modelo = models.CharField(max_length=50)
    anio = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.patente} - {self.modelo}"

# Modelo para los Conductores
class Conductor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    colectivo = models.ForeignKey(Colectivo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.email} - {self.colectivo.patente}"

# Modelo para el Registro de Pagos
class RegistroPago(models.Model):
    WORKED = 'worked'
    NOT_WORKED = 'not_worked'
    
    WORK_STATUS_CHOICES = [
        (WORKED, 'Trabajó'),
        (NOT_WORKED, 'No Trabajó'),
    ]
    
    conductor = models.ForeignKey(Conductor, on_delete=models.CASCADE)
    fecha = models.DateField()
    tarifa_pagada = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    trabajo_status = models.CharField(max_length=20, choices=WORK_STATUS_CHOICES, default=NOT_WORKED)
    pago_realizado = models.BooleanField(default=False)  # Indica si se realizó el pago

    class Meta:
        unique_together = ('conductor', 'fecha')

    def save(self, *args, **kwargs):
        # Establecer la tarifa pagada automáticamente según el estado de trabajo
        if self.trabajo_status == self.WORKED:
            self.tarifa_pagada = 1600
        else:
            self.tarifa_pagada = 600

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.conductor} - {self.fecha} - ${self.tarifa_pagada} - Pago realizado: {'Sí' if self.pago_realizado else 'No'}"


# Modelo para los Reportes Mensuales
class ReporteMensual(models.Model):
    conductor = models.ForeignKey(Conductor, on_delete=models.CASCADE)
    mes = models.DateField()  # Se puede usar solo el mes y el año
    total_ideal = models.DecimalField(max_digits=10, decimal_places=2)
    total_real = models.DecimalField(max_digits=10, decimal_places=2)
    diferencia = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Reporte de {self.conductor} - {self.mes.strftime('%B %Y')}"
