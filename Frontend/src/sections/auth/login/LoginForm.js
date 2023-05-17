import Cookies from 'js-cookie';
import { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
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
  const url1 = 'http://127.0.0.1:8000/api/login';
  const url2 = 'http://127.0.0.1:8000/api/catalogolibros';

  const [showPassword, setShowPassword] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToRegister, setGoToRegister] = useState(false);

  const [data, setData] = useState({
    email: '',
    contrasena: '',
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  // Activar solo en pruebas e2e boton de submit
  useEffect(() => {
    if (window.Cypress) {
      setDisableSubmit(false);
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    try {
      fetch(url1, {
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
            account.displayName = String(data.nombre);
            account.email = String(data.email);
            account.cedula = String(data.cedula);
            account.telefono = String(data.telefono);
            account.direccion = String(data.direccion);
            account.ciudad = String(data.ciudad);
            account.tipoDocumento = String(data.tipoDocumento);
            account.latitud = String(data.latitud);
            account.longitud = String(data.longitud);
            account.listaCoordenadas = data.listaCoordenadas;
          } else if ('error' in data) {
            info(String(data.error));
          }
          return fetch(url2, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'X-CSRFToken': Cookies.get('csrftoken'),
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        })
        .then((response) => response.json())
        .then((data) => {
          if ('success' in data) {
            console.log('DATA', data);
            account.listalibros = [];

            data.success.forEach((libro) => {
              account.listalibros.push(libro);
            });

            console.log(account.listalibros);
            setGoToDashboard(true);
          } else {
            info(String(data.error));
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    } catch (error) {
      console.warn(error);
    }
    console.log(data);
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

      <Stack alignItems="center" id="captcha" className="g-recaptcha" sx={{ pb: '1rem', marginTop: '1rem' }}>
        <ReCAPTCHA sitekey="6Lf5qt8jAAAAAAARz5DGg9H46anFT4cAd03eZ3Ig" onChange={handleRecaptcha} />
      </Stack>
      <LoadingButton
        onClick={(e) => submit(e)}
        disabled={disableSubmit}
        fullWidth
        size="large"
        type="submit"
        id="iniciarsesion"
        variant="contained"
        sx={{
          mb: '1rem',
        }}
      >
        Iniciar Sesión
      </LoadingButton>
      <NavBar2 sx={{ mb: '2rem' }} />
    </>
  );
}
