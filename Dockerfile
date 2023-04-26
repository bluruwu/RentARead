# Selecciona una imagen base de Docker
FROM python:3.9

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los requisitos de tu proyecto en el contenedor
COPY requirements.txt .

# Instala los requisitos de tu proyecto
RUN pip install -r requirements.txt

# Copia el código de tu proyecto en el contenedor
COPY . .

# Exponer el puerto que utiliza tu aplicación
EXPOSE 8000

# Ejecutar el comando para iniciar la aplicación
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
