import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { darken } from 'polished';
import swal from 'sweetalert';
import CSRFToken from '../csrftoken';

export default function RegisterPublicityForm() {
    const confirmacion = () => {
      swal({
        text: 'Se ha registrado la publicidad exitosamente',
        icon: 'success',
        button: 'Aceptar',
      });
    };

    const convert2base64 = (archivos) => {
        Array.from(archivos).forEach((archivo) => {
          const reader = new FileReader();
          reader.readAsDataURL(archivo);
          reader.onload = function () {
            let arrayAuxiliar = [];
            const base64 = reader.result;
            arrayAuxiliar = base64.split(',');
            // No funciona
            publicidad.file = atob(arrayAuxiliar[1]);
            console.log(arrayAuxiliar[1]);
          };
        });
      };
    
      const [publicidad, setPublicidad] = useState({
        empresa_encargada: '',
        precio_publicidad: '',
        file: '',
      });
    
      const frecuencia = [
        { value: '5500000', label: 'Frecuente - $5.500.000' },
        { value: '1000000', label: 'A veces - $1.000.000' },
      ];
    
      function handle(e, select = 1) {
        const newdata = { ...publicidad };
        if (select === 2) {
          newdata.precio_publicidad = e.target.value;
        } else {
          newdata[e.target.id] = e.target.value;
        }
        setPublicidad(newdata);
        console.log(newdata);
      }
      const url = 'http://127.0.0.1:8000/api/registrarPublicidad';
      function submit(e) {
        const formData = new FormData();
        formData.append('file', publicidad);
        formData.append('empresa_encargada', publicidad);
        formData.append('precio_publicidad', publicidad);
        fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
            Accept: 'aplication/json',
            'Content-type': 'aplication/json',
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            return data;
          })
          .then((data) => {
            if (String(data.success) === 'Publicidad registrada') {
              confirmacion();
            }
          })
          .catch((error) => console.warn(error));
      }    

      return (
        <>
          <Stack
            spacing={2}
            sx={{
              '& .MuiTextField-root': { m: 5, width: '37ch' },
            }}
          >
            <Grid
              container
              columns={4}
              spacing={2}
              sx={{
                '& .MuiTextField-root': { m: 1, width: '16ch' },
              }}
            >
              <CSRFToken />
          <Grid item lg={2} xs={2} md={2} >

           <TextField
           onChange={(e)=>handle(e)}
           value={dataLibro.nombre_libro}
           size='medium'
           label="Nombre del libro"
           id="nombre_libro"
           variant="outlined"
           InputProps={{ style: { width: 300 } }}
           />
           </Grid>
           <Grid item lg={2} xs={2} md={2} >

           <TextField
           onChange={(e)=>handle(e)}
           value={dataLibro.numero_paginas}
           size='medium'
           label="Numero de paginas"
           id="numero_paginas"
           variant="outlined"
           InputProps={{ style: { width: 300 } }}
           />
           </Grid>
           <Grid item lg={2} xs={2} md={2} >

           <TextField
           onChange={(e)=>handle(e)}
           value={dataLibro.codigo_ISBN}
           size='medium'
           label="ISBN"
           id="codigo_ISBN"
           variant="outlined"
           InputProps={{ style: { width: 300 } }}
           />
           </Grid>
           <Grid item lg={2} xs={2} md={2} >

           <TextField
           onChange={(e)=>handle(e)}
           value={dataLibro.nombre_autor}
           size='medium'
           label="Autor"
           id="nombre_autor"
           variant="outlined"
           InputProps={{ style: { width: 300 } }}
           />
           </Grid>
           <Grid item lg={2} xs={2} md={2} >
           <TextField
            id="genero_libro"
            select
            label="Genero"
            size='medium'
            onChange={(e)=>handle(e,3)}
            value={dataLibro.genero_libro}
            InputProps={{ style: { width: 300 } }}
            >
            {genero.map((optione) => (
            <MenuItem key={optione.value} value={optione.value}>
            {optione.label}    
            </MenuItem>    
            ))}    
            </TextField>
           </Grid>
           <Grid item lg={2} xs={2} md={2} >
           <TextField
            id="estado_libro"
            select
            label="Estado"
            size='medium'
            onChange={(e)=>handle(e,4)}
            value={dataLibro.estado_libro}
            InputProps={{ style: { width: 300 } }}
            >
            {estadoLibro.map((optione) => (
            <MenuItem key={optione.value} value={optione.value}>
            {optione.label}    
            </MenuItem>    
            ))} 
            </TextField>
            </Grid>
        <Stack spacing={2}>
          <input type="file" name="file" onChange={(e) => convert2base64(e.target.files)} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
              '&:active': {
                backgroundColor: 'rgb(251, 131, 36)',
              },
              '&:focus': {
                backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
              },
              '&:hover': {
                backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
              },
            }}
            onClick={(e) => submit(e)}
          >
            {' '}
            Registrar Publicidad
          </Button>
        </Stack>

</Grid>
</Stack>
</>
);    
}