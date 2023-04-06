import React from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { darken } from 'polished';


// Este componente representa la barra de navegación que 
// se muestra en la parte superior de la página y contiene un 
// logo y un botón de login.
export default function NavBar2() {
  const navigate = useNavigate();

  // Direcionamiento
  const handleClick = () => {
    navigate('/register', { replace: true });
  };

  return (
    <Box sx={{ marginLeft: '0.5rem' , fontSize: '0.5rem' }}>
     
      <LoadingButton
        variant="contained"
        onClick={handleClick}
        sx={{
          height: '20px',
          width: '100%',
          maxWidth: '480px',
          backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          '&:active': {
            backgroundColor: 'rgb(251, 131, 36)',
          },
          '&:focus': {
            backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          },
          '&:hover': {
            backgroundColor: darken(0.0, 'rgb(251, 131, 36)'),
          
          }

        }} // aquí se crea un tono más oscuro color orange
        
      >
        Crear una cuenta
      </LoadingButton>
    </Box>
  );
}
