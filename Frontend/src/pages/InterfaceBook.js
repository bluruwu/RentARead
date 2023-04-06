import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Avatar } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import Nav from 'src/layouts/dashboard/nav';
import AccountPopover from 'src/layouts/dashboard/header/AccountPopover';  // eslint-disable-line import/no-unresolved
import BookB from './BookB';





// components

// hooks



import useResponsive from '../hooks/useResponsive';
import NavBook from '../components/nav-section/NavBook';
import Start from './Start';
// @mui
// components

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '100%',

    justifyContent: 'space-between',
  },
}));

const StyledRoot2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    boxShadow: theme.customShadows.card,
    flex: 1,
    backgroundColor: 'transparent',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',

  maxWidth: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
// Interfaz de libro

export default function InterfaceBook() {
  const mdUp = useResponsive('up', 'md');
  const [rating, setRating] = useState(3.5); // Valor inicial de la calificación

  function handleRatingChange(newRating) {
    setRating(newRating);
  }



  return (
    <>
      <Helmet>
      
        <title> Book | RentARead </title>
      </Helmet>
    
       
      <StyledRoot>
        <Nav />
        
        
      
      
        
        <Container maxWidth="100%">
        
                       
          {/* Zona de la imagen del libro */}
          {/* implementar fucion donde reciba la url del libro */}
          {/* hay que definir un formato de la portadas 425x560 */}
          <StyledContent sx={{ position: 'relative'}}>
          { /* Portada del libro */ }
            <Avatar
              variant="rounded"
              alt="Login"

              src={'/static/exampleC.jpg'} // ruta de la imagen implementar  que cambie depiendo del libro
              style={{
                width: 'auto',  // ancho
                height: '50vh',  // largo
                border: '2px solid red',
                position: 'absolute',
                top: 40,    // Posicion en el eje y 
                left: -270, // posicion en el eje x
                margin: '20px'
              }}
            />

              { /* Titulo del libro */ }
            <Typography variant="h2" paragraph
              sx={{
                position: 'absolute',
                top: 50, // Posicion y
                left: -10, // posision x
              }}
            >
              THE FIRST DAYS
              <Typography sx={{ color: 'text.secondary' }}>
                <p>
                  Rhiannon Frate
                </p>

              </Typography>


              <Typography sx={{ color: 'text.secondary' }}>
                <p>
                  Katie is driving to work one beautiful day when a dead man jumps into her car and tries to eat her.  That same morning, Jenni opens a bedroom door to find her husband devouring their toddler son.
                  Fate puts Jenni and Katie—total strangers—together in a pickup, fleeing the suddenly zombie-filled streets of the Texas city in which they live. Before the sun has set, they have become more than just friends and allies—they are bonded as tightly as any two people who have been to war together.
                </p>
              </Typography>
            </Typography>
            {/* Icono de pluma */}
            <Avatar
              variant='rounded"'
              alt="Login"

              src={'/static/iconE.png'}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: "50%",
                objectFit: "cover",
                position: 'absolute',
                top: 104,
                left: 130,

              }}
            />

            {/* ...otros componentes */}
            <NavBook />
            {/*  .. seccion de calificacion del libro */}
            <Start value={rating} onChange={() => handleRatingChange()} />
            <Typography 
              sx={{
                position: 'absolute',
                top: 340, // valores grandes baja el texto
                 left: 100,
                 fontSize: '24px', // tamaño de la letra
                 fontStyle: 'Comic Sans MS', // estilo de la letra
                 fontWeight: 'bold', // grosor de la letra
                 fontFamily: 'Book Antiqua', // fuente de la letra
                }}>
                <p>{rating} </p>




              </Typography>

              
              { /* Seccion vendedor */ }
              <Typography  variant="h5" paragraph
              sx={{
                position: 'absolute',
                top:370,
                 left: -10,
                 
                }}>
                <p>Acerca del vendedor </p>
              </Typography>
              
              { /* Nombre del vendedor   */ }
              <Typography sx={{ color: 'text.secondary',
                      position: 'absolute',
                      top:393,
                       left: -10,
                        }}>
                 < Link  to="/otra-pagina"> Estibaliz Baeza</ Link >
                
              </Typography> 
              <Typography sx={{ color: 'text.secondary',
                      position: 'absolute',
                      top:415,
                       left: -10,
                        }}>
                <p>
                Calle 45#12-34
                </p>

              </Typography> 
              <Typography sx={{ color: 'text.secondary',
                      position: 'absolute',
                      top:440,
                       left: -10,
                        }}>
                <p>
                Cali
                </p>

              </Typography>   

              


  
          </StyledContent>

         
          

        </Container>
        <StyledRoot2 >
        <AccountPopover />
         
        </StyledRoot2>                


      </StyledRoot>
    </>
  );
}
