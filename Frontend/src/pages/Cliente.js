import React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Stack, Avatar, Typography } from '@mui/material';

import account from '../_mock/account';
import Visits from './Visits';

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

const StyledContentGra = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',

  float: 'left',
  position: 'relative',
  left: '-400px',
  minHeight: '5vh',
  display: 'flex',
  top: '280px',

  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(1, 1),
}));

const StyledContentMap = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',

  float: 'left',
  position: 'relative',
  left: '400px',
  minHeight: '5vh',
  display: 'flex',
  top: '280px',

  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(1, 1),
}));

export default function Cliente() {
  return (
    <div className="Info-cliente">
      <Helmet>
        <title>Mis Datos</title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4" gutterBottom>
          Datos
        </Typography>
      </Stack>
      <StyledContentimg>
        <Avatar
          src={''}
          style={{
            width: '200px',
            height: '200px',
          }}
        />
      </StyledContentimg>

      <StyledContent sx={{ textAlign: 'left', alignItems: 'center' }}>
        <div className="contenedor-text">
          <p className="nombre"> Nombre: {account.displayName}</p>
          <p className="direccion"> Direccion: {account.direccion}</p>
          <p className="ciudad"> Ciudad: {account.ciudad}</p>
          <p className="telefono"> Telefono: {account.telefono}</p>
          <p className="cedula"> Cedula: {account.cedula}</p>
          <p className="estracto"> Estrato: 1</p>
        </div>
      </StyledContent>

      <StyledContentInfo sx={{ textAlign: 'left', alignItems: 'center' }}>
        <div className="contenedor-text-contrato">
          <h2 className="Contrato"> Datos de Contrato</h2>
          <p className="NoContrato"> Libros en préstamo: 2</p>
          <p className="Estado"> Estado de cuenta: {account.mora}</p>
          <p className="ultimopago"> Fecha de ultimo pago: 10/01/2023</p>
          <p className="ultimafactura"> Fecha ultima factura: 10/02/2023</p>
        </div>
      </StyledContentInfo>
    </div>
  );
}
