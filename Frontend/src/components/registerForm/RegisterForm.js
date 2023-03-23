import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { func } from 'prop-types';
import { useState } from 'react';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { intlFormat } from 'date-fns';
import CSRFToken from '../csrftoken';

export default function RegisterForm() {
  const confirmacion = () => {
    swal({
      text: 'El usuario ha sido creado.',
      icon: 'success',
      button: 'Aceptar',
    });
  };
  

  const fallo = () => {
    swal({
      text: 'Las contraseñas no coinciden.',
      icon: 'error',
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

  const url = 'http://127.0.0.1:8000/api/register';
  const [data, setData] = useState({
    cedula: '',
    nombre: '',
    correo_electronico: '',
    contrasena: '',
    contrasena_re: '',
    telefono: '',
    id_tipo_usuario: '',
    tipo_documento:'', 
    ciudad:'',
    direccion : ''
  });

  const tipoUsuario = [ 
    {value:"1", label:"Gerente" },
    {value: "2",label: "Administrador"},
    {value:"4", label: "Operador"},
    {value:"3",label:"Cliente"},
    

   
    ]
    const docIdType=[
      {label:"C.C.",value:"cc"},
      {label:"N.I.T.", value:"nit"},
      {label: "Ciudad",value:"ciudad"}
  
    ]


  function handle(e,select=0) {
    const newdata = { ...data };
    if(select ===1 ){
      newdata.tipo_documento=e.target.value
    }else if (select===2){
      newdata.id_tipo_usuario=e.target.value
    }else{
      newdata[e.target.id] = e.target.value;
    }
    setData(newdata);
    console.log(newdata);
  }

  function submit(e) {
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        if (String(data.success) === 'El usuario ha sido creado') {
          confirmacion();
        } else if (String(data.error) === 'Las contraseñas no coinciden') {
          fallo();
        } else if (
          String(data.error) === 'Este correo electrónico ya está en uso' ||
          String(data.error) === 'Ya existe una cuenta asociada a esta cédula' ||
          String(data.error) === 'La contraseña es muy corta'
        )
          info(String(data.error));
      })
      .catch((error) => console.warn(error));
  }
  return (
    <>
      <Stack spacing={3} sx={{
        '& .MuiTextField-root': { m: 1, width: '37ch' },
        }}>
        <Grid container columns={4} spacing={2} sx={{
        '& .MuiTextField-root': { m: 1, width: '37ch' },
        }} >  
        <CSRFToken />
        <Grid item lg={2}xs={2} md={2}>
          <TextField
          id='tipo_documento'
          select
          label = "Tipo de Documento"
          size= 'medium'
          onChange={(e)=>handle (e,1)}
          value= {data.tipo_documento }
          >
            { docIdType.map((optione) => (
              <MenuItem key={optione.value} value={optione.value}>
              {optione.label}
              </MenuItem>
              ))}
              
          </TextField>
        </Grid>
        
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.cedula}
            size="medium"
            label="Cedula"
            id="cedula"
            variant="outlined"
          />
        </Grid>
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.nombre}
            size="medium"
            label="Nombre completo"
            id="nombre"
            variant="outlined"
          />
        </Grid>
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.correo_electronico}
            size="medium"
            label="Correo electronico"
            id="correo_electronico"
            variant="outlined"
          />
        </Grid>
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.contrasena}
            size="medium"
            label="Contraseña"
            id="contrasena"
            variant="outlined"
            type='password'
          />
        </Grid>
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.contrasena_re}
            size="medium"
            label="Confirmar contraseña"
            id="contrasena_re"
            variant="outlined"
            type='password'
          />
        </Grid>
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.telefono}
            size="medium"
            label="Telefono"
            id="telefono"
            variant="outlined"
          />
        </Grid>
        
        










        <Grid item lg={2}xs={2} md={2}>
          <TextField
            id="id_tipo_usuario"
            select
            label="Tipo de usuario"
            onChange={(e) => handle(e,2)}
            value={data.id_tipo_usuario}
            size="medium"
            
            
            variant="outlined"

          >
            {tipoUsuario.map((option) => (
              <MenuItem key={option.value} value={option.value}>
              {option.label}
              </MenuItem>
              ))}
              
        
          </TextField>
        </Grid>
       
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.ciudad}
            size="medium"
            label="Ciudad"
            id="ciudad"
            variant="outlined"
          />
        </Grid>
       
        <Grid item lg={2}xs={2} md={2}>
          <TextField
            onChange={(e) => handle(e)}
            value={data.direccion}
            size="medium"
            label="Dirección"
            id="direccion"
            variant="outlined"
          />
        </Grid>
        </Grid>
        <Stack spacing={2}>
          <Button onClick={(e) => submit(e)} variant='contained'> Registrarse </Button>
        </Stack>
      </Stack>

      
    </>
  );
}
