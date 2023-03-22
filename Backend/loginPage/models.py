# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Bancoaliado(models.Model):
    id_banco = models.IntegerField(primary_key=True)
    nombre_corresponsal = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'bancoaliado'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        'DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    consumo = models.IntegerField()
    costo = models.DecimalField(max_digits=15, decimal_places=2)

    id_inmueble = models.ForeignKey(
        'Inmueble', models.DO_NOTHING, db_column='id_inmueble')
    id_publicidad = models.ForeignKey(
        'Publicidad', models.DO_NOTHING, db_column='id_publicidad')

    fecha_inicio = models.DateField()
    fecha_corte = models.DateField()
    fecha_vencimiento = models.DateField()
    fecha_expedicion = models.DateField()

    id_tarifa_mes = models.ForeignKey(
        'Tarifa', models.DO_NOTHING, db_column='id_tarifa_mes')
    subsidio_contribucion = models.DecimalField(
        max_digits=15, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'factura'

    def __str__(self):
        return f"{self.id_factura}, {self.consumo}, {self.costo}, {self.id_inmueble}, {self.id_publicidad}, {self.fecha_inicio}, {self.fecha_corte}, {self.fecha_vencimiento}, {self.fecha_expedicion}"


class Inmueble(models.Model):
    id_inmueble = models.AutoField(primary_key=True)
    tipo_inmueble = models.CharField(max_length=100)
    estrato = models.IntegerField()
    estado_inmueble = models.CharField(max_length=50, default="activo")
    cedula = models.ForeignKey(
        'Usuario', models.DO_NOTHING, db_column='cedula')
    barrio = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    complemento = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'inmueble'

    def __str__(self):
        return f"{self.id_inmueble}, {self.tipo_inmueble}, {self.estrato}, {self.estado_inmueble}, {self.cedula}, {self.barrio}, {self.ciudad}, {self.direccion}, {self.complemento}"


class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    monto = models.IntegerField()
    id_factura = models.ForeignKey(
        Factura, models.DO_NOTHING, db_column='id_factura')
    id_banco = models.ForeignKey(
        Bancoaliado, models.DO_NOTHING, db_column='id_banco')
    fecha = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'pago'


class Publicidad(models.Model):
    id_publicidad = models.AutoField(primary_key=True)
    empresa_encargada = models.CharField(max_length=100)
    precio_publicidad = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'publicidad'


class Tarifa(models.Model):
    id_tarifa_mes = models.DateField(primary_key=True)
    tarifa_mes = models.DecimalField(max_digits=15, decimal_places=2)
    estrato1 = models.DecimalField(max_digits=15, decimal_places=2)
    estrato2 = models.DecimalField(max_digits=15, decimal_places=2)
    estrato3 = models.DecimalField(max_digits=15, decimal_places=2)
    estrato4 = models.DecimalField(max_digits=15, decimal_places=2)
    estrato5 = models.DecimalField(max_digits=15, decimal_places=2)
    estrato6 = models.DecimalField(max_digits=15, decimal_places=2)
    comercial_industrial = models.DecimalField(
        max_digits=15, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'tarifa'


class Tipousuario(models.Model):
    id_tipo_usuario = models.IntegerField(primary_key=True)
    tipo_usuario = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'tipousuario'


class Ubicacion(models.Model):
    id_ubicacion = models.IntegerField(primary_key=True)
    direccion = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'ubicacion'


class Usuario(models.Model):
    cedula = models.CharField(primary_key=True, max_length=100)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=100)
    correo_electronico = models.CharField(max_length=100)
    estado_usuario = models.CharField(max_length=100, default='activo')
    id_tipo_usuario = models.ForeignKey(
        Tipousuario, models.DO_NOTHING, db_column='id_tipo_usuario')
    tipo_documento = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'usuario'

    def __str__(self):
        return f"{self.cedula}, {self.nombre}, {self.telefono}, {self.correo_electronico}, {self.estado_usuario}, {self.id_tipo_usuario}, {self.tipo_documento}"
