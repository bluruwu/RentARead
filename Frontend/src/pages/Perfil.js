import React from 'react';
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
          src={account.photoURL}
          style={{
            width: '200px',
            height: '200px',
          }}
        />
      </StyledContentimg>

      <StyledContent sx={{ textAlign: 'left', alignItems: 'center' }}>
        <div className="contenedor-text">
          <p className="nombre"> Nombre: {account.displayName}</p>
          <p className="cedula">
            {' '}
            Cedula: {account.tipoDocumento} {account.cedula}
          </p>
          <p className="cedula"> Email: {account.email}</p>
          <p className="telefono"> Telefono: {account.telefono}</p>
          <p className="ciudad"> Ciudad: {account.ciudad}</p>
          <p className="direccion"> Direccion: {account.direccion}</p>
        </div>
      </StyledContent>
    </div>
  );
}
