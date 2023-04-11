import Cookies from 'js-cookie';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import swal from 'sweetalert';
import { darken } from 'polished';
import NavBar2 from '../../../components/nav-section/NavBar2';
import Iconify from '../../../components/iconify';
import CSRFToken from '../../../components/csrftoken';

import account from '../../../_mock/account';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const confirmacion = () => {
    swal({
      text: 'Te has logeado con exito',
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

  // Captcha
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [captchaResult, setCaptchaResult] = useState();
  const handleRecaptcha = (value) => {
    fetch('http://127.0.0.1:8000/api/recaptcha', {
      method: 'POST',
      body: JSON.stringify({ captcha_value: value }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (String(data.captcha.success) === 'true') {
          setDisableSubmit(false);
        } else setDisableSubmit(true);
        console.log(data.captcha.success);
        setCaptchaResult(data.captcha.success);
      });
  };

  // Login
  const url = 'http://127.0.0.1:8000/api/login';
  const [showPassword, setShowPassword] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToRegister, setGoToRegister] = useState(false);

  const [data, setData] = useState({
    email: '',
    contrasena: '',
    cedula: '',
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

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
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (String(data.success) === 'Usuario autenticado exitosamente') {
            confirmacion();
            setGoToDashboard(true);
            account.displayName = String(data.nombre);
            account.email = String(data.email);
            account.cedula = String(data.cedula);
            account.telefono = String(data.telefono);
            account.direccion = String(data.direccion);
            account.ciudad = String(data.ciudad);
            account.tipoDocumento = String(data.tipoDocumento);

            //   account.coordenadas = String(data.coordenadas);
            //   account.tipo = data.tipo;
            //   console.log(account.lista);
            //   account.lista = data.lista;
            //   console.log(account.lista);
            //   account.listaCliente = data.listaC;
            //   account.listaCoordenadas = data.listaLoc;
            //   account.facturas = data.listaFac;
            //   console.log(account);
          } else if ('error' in data) {
            info(String(data.error));
          }
        });
    } catch (error) {
      console.warn(error);
    }

    // data.cedula = account.cedula;
    // try {
    //   fetch(urll, {
    //     method: 'POST',
    //     credentials: 'same-origin',
    //     headers: {
    //       'X-CSRFToken': Cookies.get('csrftoken'),
    //       Accept: 'application/json',
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (String(data.success) === 'En mora') {
    //         confirmacion();
    //         //   account.mora = 'En mora';
    //         // } else if (String(data.success) === 'Facturas al día') {
    //         //   account.mora = 'Facturas al dia';
    //         // } else if (String(data.success) === 'Facturas pendientes') {
    //         //   account.mora = 'Facturas pendientes';
    //         // }
    //       }
    //       else {

    //       }
    //     });
    // } catch (error) {
    //   console.warn(error);
    // }
  }

  if (goToDashboard) {
    return <Navigate to="/dashboard/inicio" />;
  }

  if (goToRegister) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      <Stack spacing={3}>
        <CSRFToken />

        <TextField
          onChange={(e) => handle(e)}
          value={data.email}
          name="email"
          label="Email"
          id="email"
          variant="outlined"
        />

        <TextField
          onChange={(e) => handle(e)}
          value={data.contrasena}
          name="password"
          label="Contraseña"
          id="contrasena"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="center" className="g-recaptcha" sx={{ pb: '1rem', marginTop: '1rem' }}>
        <ReCAPTCHA sitekey="6Lf5qt8jAAAAAAARz5DGg9H46anFT4cAd03eZ3Ig" onChange={handleRecaptcha} />
      </Stack>
      <LoadingButton
        onClick={(e) => submit(e)}
        disabled={disableSubmit}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mb: '1rem',
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
      >
        Iniciar Sesión
      </LoadingButton>
      <NavBar2 sx={{ mb: '2rem' }} />
    </>
  );
}
