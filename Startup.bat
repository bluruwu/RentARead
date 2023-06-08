@echo off
CALL cd "%~dp0"Frontend
CALL npm run build
CALL cd ..
CALL cd "%~dp0"backend
CALL python manage.py collectstatic --no-input
::CAMBIAR RUTA A DONDE TIENEN PYTHON INSTALADO, AQUI ->>>>>>>>>>>>>>>>>>
CALL "%LocalAppData%"\Programs\Python\Python310\python.exe manage.py runserver
pause