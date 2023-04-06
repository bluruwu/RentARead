import React from "react";

import { useNavigate } from "react-router-dom";
// @mui
// import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components
import { darken } from 'polished';








// Este componente representa la barra de navegación que 
// se muestra en la parte superior de la página y contiene un 
// logo y un botón de login.
export default function NavBook() {
  const navigate = useNavigate();

  // Direcionamiento
  const handleClick = () => {
    navigate('/register', { replace: true });
  };

  return (
    <>
      <LoadingButton
        variant="contained"

        sx={{
          backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: 0,
          position: 'absolute',
          top: 410,
          left: -250,
          width: '220px', // define el ancho
          height: '20px', // define el alto  
          py: 1,
          px: 3,
          mr: 1,
          '&:hover': {
            backgroundColor: darken(0.05, 'rgb(251, 131, 36)'),
          },
        }}
      >
        Comprar por $$
      </LoadingButton>

      <LoadingButton
        variant="contained"

        sx={{
          backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: 0,
          position: 'absolute',
          top: 440,
          left: -250,
          width: '220px', // define el ancho
          height: '20px', // define el alto    
          py: 1,
          px: 3,
          mr: 1,
          '&:hover': {
            backgroundColor: darken(0.05, 'rgb(251, 131, 36)'),
          },
        }}
      >
        Rentar por $$
      </LoadingButton>
      <LoadingButton
        variant="contained"

        sx={{
          backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: 0,
          position: 'absolute',
          top: 470,
          left: -250,
          width: '220px', // define el ancho
          height: '20px', // define el alto  
          py: 1,
          px: 3,
          mr: 1,
          '&:hover': {
            backgroundColor: darken(0.05, 'rgb(251, 131, 36)'),
          },
        }}
      >
        Intercambiar
      </LoadingButton>
      <LoadingButton
        variant="contained"

        sx={{
          backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: 0,
          position: 'absolute',
          top: 500,
          left: -250,
          width: '220px', // define el ancho
          height: '20px', // define el alto  
          py: 1,
          px: 3,
          mr: 1,
          '&:hover': {
            backgroundColor: darken(0.05, 'rgb(251, 131, 36)'),
          },
        }}
      >
        Chat vendedor
      </LoadingButton>


    </>


  );
}


