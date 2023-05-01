import { Button, Grid, MenuItem, Stack, TextField, Box, Container } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { darken } from 'polished';
import swal from 'sweetalert';
import CSRFToken from '../csrftoken';
import account from '../../_mock/account';

export default function AgregarLibroForm() {
  const confirmacion = () => {
    swal({
      text: 'La informacion del libro se ha registrado exitosamente',
      icon: 'success',
      button: 'Aceptar',
    });
  };

  const info = (msg) => {
    swal({
      text: msg,
      icon: 'info',
      button: 'Aceptar',
    });
  };

  const [goToCatalogo, setGoToCatalogo] = useState(false);

  const convert2base64 = (archivos) => {
    Array.from(archivos).forEach((archivo) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        let arrayAuxiliar = [];
        const base64 = reader.result;
        arrayAuxiliar = base64.split(',');
        // No funciona
        dataLibro.file = atob(arrayAuxiliar[1]);
        console.log(arrayAuxiliar[1]);
      };
    });
  };

  const [dataLibro, setDataLibro] = useState({
    nombre_libro: '',
    numero_paginas: '',
    codigo_ISBN: '',
    nombre_autor: '',
    genero_libro: '',
    estado_libro: '',
    uso_libro: '',
    uso_libro_opcion: '',
    editorial_libro: '',
    fecha_libro: '',
    descripcion_libro: '',
    file: '',
    email: account.email,
  });

  const estadoLibro = [
    { value: '1', label: 'Excelente' },
    { value: '2', label: 'Bueno' },
    { value: '3', label: 'Regular' },
    { value: '4', label: 'Deficiente' },
  ];

  const genero = [
    { value: '1', label: 'Terror' },
    { value: '2', label: 'Ciencia ficción' },
    { value: '3', label: 'Romance' },
    { value: '4', label: 'Drama' },
    { value: '5', label: 'Misterio' },
    { value: '6', label: 'Novela' },
    { value: '7', label: 'Clásico' },
    { value: '8', label: 'Suspenso' },
    { value: '9', label: 'Psicología' },
  ];

  const usoLibro = [
    { value: 'Precio de venta', label: 'Venta' },
    { value: 'Precio de renta por semana', label: 'Renta' },
    { value: 'Intercambio?', label: 'Intercambio' },
  ];

  function handle(e, select = 1) {
    const newdata = { ...dataLibro };
    if (select === 2) {
      newdata.uso_libro = e.target.value;
    }
    if (select === 3) {
      newdata.genero_libro = e.target.value;
    }
    if (select === 4) {
      newdata.estado_libro = e.target.value;
    } else {
      newdata[e.target.id] = e.target.value;
    }
    setDataLibro(newdata);
    console.log(newdata);
  }

  const url = 'http://127.0.0.1:8000/api/registrarLibro';

  function submit(e) {
    e.preventDefault();
    try {
      fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(dataLibro),
      })
        .then((response) => response.json())
        .then((dataLibro) => {
          if ('success' in dataLibro) {
            confirmacion();
            setGoToCatalogo(true);
          } else if ('error' in dataLibro) {
            info(String(dataLibro.error));
          }
        });
    } catch (error) {
      console.warn(error);
    }
  }

  if (goToCatalogo) {
    return <Navigate to="/dashboard/inicio" />;
  }

  return (
    <>
      <Container style={{ height: '60vh' }}>
        <Grid container columns={2} item lg={20} xs={20} md={20}>
          <Stack
            spacing={5}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '35ch' },
            }}
          >
            <Grid
              container
              columns={2}
              spacing={2}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
              }}
            >
              <CSRFToken />
              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.nombre_libro}
                  size="medium"
                  label="Nombre del libro"
                  id="nombre_libro"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  InputProps={{ style: { width: '100%' } }}
                />
              </Grid>
              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.nombre_autor}
                  size="medium"
                  label="Autor"
                  id="nombre_autor"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  InputProps={{ style: { width: '100%' } }}
                />
              </Grid>
              <Grid>
                <TextField
                  id="genero_libro"
                  select
                  label="Género"
                  size="medium"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  onChange={(e) => handle(e, 3)}
                  value={dataLibro.genero_libro}
                  InputProps={{ style: { width: '100%' } }}
                >
                  {genero.map((optione) => (
                    <MenuItem key={optione.value} value={optione.value}>
                      {optione.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.numero_paginas}
                  size="medium"
                  label="Numero de páginas (Opcional)"
                  id="numero_paginas"
                  inputMode="numeric"
                  InputProps={{ style: { width: '100%' } }}
                  InputLabelProps={{
                    style: { fontSize: 12 },
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.codigo_ISBN}
                  size="medium"
                  label="ISBN (Opcional)"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  id="codigo_ISBN"
                  InputProps={{ style: { width: '100%' } }}
                />
              </Grid>

              <Grid>
                <TextField
                  id="estado_libro"
                  select
                  label="Estado"
                  size="medium"
                  onChange={(e) => handle(e, 4)}
                  value={dataLibro.estado_libro}
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  InputProps={{ style: { width: '100%' } }}
                >
                  {estadoLibro.map((optione) => (
                    <MenuItem key={optione.value} value={optione.value}>
                      {optione.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.editorial_libro}
                  size="medium"
                  label="Editorial"
                  id="editorial_libro"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  InputProps={{ style: { width: '100%' } }}
                />
              </Grid>
              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.descripcion_libro}
                  size="medium"
                  label="Descripción"
                  id="descripcion_libro"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  InputProps={{ style: { width: '100%' } }}
                />
              </Grid>
              <Grid>
                <TextField
                  onChange={(e) => handle(e)}
                  value={dataLibro.fecha_libro}
                  size="medium"
                  label="Año de publicación"
                  id="fecha_libro"
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  InputProps={{ style: { width: '100%' } }}
                />
              </Grid>
              <Grid item xs={1} />

              <TextField
                id="uso_libro"
                select
                label="Disponible para"
                size="medium"
                InputLabelProps={{
                  style: { fontSize: 14 },
                }}
                onChange={(e) => handle(e, 2)}
                value={dataLibro.uso_libro}
                InputProps={{ style: { width: '100%' } }}
              >
                {usoLibro.map((optione) => (
                  <MenuItem key={optione.value} value={optione.value}>
                    {optione.label}
                  </MenuItem>
                ))}
              </TextField>
              {dataLibro.uso_libro === 'Precio de renta por semana' && (
                <TextField
                  id="otro_campo"
                  label="Precio Renta"
                  size="medium"
                  onChange={(e) => handle(e, 6)}
                  value={dataLibro.otro_campo}
                  InputProps={{ style: { width: '100%' } }}
                />
              )}
              {dataLibro.uso_libro === 'Intercambio?' && (
                <TextField
                  id="otro_campo"
                  label="Duración del intercambio"
                  InputLabelProps={{
                    style: { fontSize: 12 }, // establecer el tamaño de fuente deseado
                  }}
                  size="medium"
                  onChange={(e) => handle(e, 5)}
                  value={dataLibro.otro_campo}
                  InputProps={{ style: { width: '100%' } }}
                />
              )}

              {dataLibro.uso_libro === 'Precio de venta' && (
                <TextField
                  id="otro_campo"
                  label="Precio Venta"
                  size="medium"
                  onChange={(e) => handle(e, 5)}
                  value={dataLibro.otro_campo}
                  InputProps={{ style: { width: '100%' } }}
                />
              )}
            </Grid>

            <Stack spacing={1}>
              <input type="file" name="file" accept="image/*" onChange={(e) => convert2base64(e.target.files)} />
              <Button
                variant="contained"
                sx={{
                  marginBottom: '10px',
                  backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
                  '&:active': {
                    backgroundColor: 'rgb(251, 131, 36)',
                  },
                  '&:focus': {
                    backgroundColor: darken(0.0, 'rgb(179,97,25)'),
                  },
                  '&:hover': {
                    backgroundColor: darken(0.0, 'rgb(179,97,25)'),
                  },
                }}
                onClick={(e) => submit(e)}
              >
                {' '}
                Registrar Libro
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </>
  );
}
