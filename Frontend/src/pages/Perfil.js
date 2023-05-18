import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Stack, Avatar, Typography } from '@mui/material';
import account from '../_mock/account';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  float: 'left',
  position: 'relative',
  left: '300px',
  minHeight: '5vh',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(4, 2),
}));

const StyledContentimg = styled('div')(({ theme }) => ({
  maxWidth: 100,
  margin: 'auto',
  float: 'left',
  position: 'relative',
  left: '80px',
  minHeight: '10vh',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(4, 2),
}));

const StyledContentInfo = styled('div')(({ theme }) => ({
  maxWidth: 300,
  margin: 'auto',
  float: 'left',
  position: 'relative',
  top: '20px',
  left: '550px',
  minHeight: '5vh',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(2, 2),
}));

export default function Cliente() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Obtener los datos de las cookies
    const obtenerDatosUsuarioCookie = () => {
      const nombre = Cookies.get('nombre');
      const cedula = Cookies.get('cedula');
      const email = Cookies.get('email');
      const telefono = Cookies.get('telefono');
      const ciudad = Cookies.get('ciudad');
      const direccion = Cookies.get('direccion');
      const tipoDocumento = Cookies.get('tipoDocumento');
      const avatarNumber = Cookies.get('avatar');
      const avatarURL = `/static/images/avatars/avatar_${avatarNumber}.jpg`;
      // Agrega más llamadas a Cookies.get() para obtener otros datos de las cookies

      return {
        nombre,
        cedula,
        email,
        telefono,
        ciudad,
        direccion,
        tipoDocumento,
        avatar: avatarURL,
        // Agrega más propiedades para otros datos de las cookies
      };
    };

    // Actualizar el estado con los datos de las cookies
    setUserData(obtenerDatosUsuarioCookie());
  }, []);

  return (
    <div className="Info-cliente">
      <Helmet>
        <title>Mi Perfil</title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>
      </Stack>
      <StyledContentimg>
        <Avatar
          src={userData.avatar}
          style={{
            width: '200px',
            height: '200px',
          }}
        />
      </StyledContentimg>

      <StyledContent sx={{ textAlign: 'left', alignItems: 'center' }}>
        <div className="contenedor-text">
          <p className="nombre"> {userData.nombre}</p>
          <p className="cedula">
            {' '}
            {userData.tipoDocumento} {userData.cedula}
          </p>
          <p className="cedula"> Email: {userData.email}</p>
          <p className="telefono"> Telefono: {userData.telefono}</p>
          <p className="ciudad"> Ciudad: {userData.ciudad}</p>
          <p className="direccion"> Direccion: {userData.direccion}</p>
        </div>
      </StyledContent>
    </div>
  );
}
