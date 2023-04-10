import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Avatar, Box} from '@mui/material';
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
  },
}));

const StyledRoot2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}));



const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',

  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

   

    return( 
    <>
    <Helmet>
        <title> Book | RentARead </title>
    </Helmet>
    <Nav />
    <Container maxWidth='sm' class="container-sm">
    <StyledRoot2> 
   
<Box style={{
        position: 'absolute', left: '35%', top: '40%',
        transform: 'translate(-50%, -50%)',
        padding: '500px'
        }}>
         <div style={{ marginBottom: '10px' }}>

           <Avatar
        variant="rounded"
        alt="Login"
        src={'/static/exampleC.jpg'}
        style={{
          width: 'auto',
          height: '50vh',
          border: '2px solid red' // Aquí se establece el borde en color rojo
        }}/>
         </div>
         <div style={{ marginBottom: '10px' }}><NavBook/></div>
       
            
        </Box>


        <Box style={{
        position: 'absolute', left: '65%', top: '40%',
        transform: 'translate(-50%, -50%)'
        }}>
          
          <Typography variant="h2" paragraph
              
            >
              THE FIRST DAYS
              <Typography sx={{ color: 'text.secondary'}}>
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
                top: '15%',
                left: '30%'
                

              }}
            />

            
            {/*  .. seccion de calificacion del libro */}
            <Start value={rating} onChange={() => handleRatingChange()} 
               
            />
            <Typography 
              sx={{
                position: 'absolute',
                
                 fontSize: '24px', // tamaño de la letra
                 fontStyle: 'Comic Sans MS', // estilo de la letra
                 fontWeight: 'bold', // grosor de la letra
                 fontFamily: 'Book Antiqua', // fuente de la letra
                 top:'94%',
                 left : '30%'                
                }}>
                <p>{rating} </p>




              </Typography>

              
              { /* Seccion vendedor */ }
              <Typography  variant="h5" paragraph
              sx={{
                position: 'absolute',
                top: '102%',
                
                 
                }}>
                <p>Acerca del vendedor </p>
              </Typography>
              
              { /* Nombre del vendedor   */ }
              <Typography sx={{ color: 'text.secondary',
                      position: 'absolute',
                      top: '109%',
                      
                        }}>
                 < Link  to="/otra-pagina"> Estibaliz Baeza</ Link >
                
              </Typography> 
              <Typography sx={{ color: 'text.secondary',
                      position: 'absolute',
                      top:'114%'
                     
                        }}>
                <p>
                Calle 45#12-34
                </p>
                          
              </Typography> 
              <Typography sx={{ color: 'text.secondary',
                      position: 'absolute',
                      top: '120%'
                     
                        }}>
                <p>
                Cali
                </p>

              </Typography> 
        </Box>

        <Box style={{
        position: 'absolute', left: '98%', top: '5%',
        transform: 'translate(-50%, -50%)'
        }}>
           {mdUp && (
         <AccountPopover  />)}

        </Box>

          
          

       

    </StyledRoot2>
       
    
    </Container>
    
	
	
	




     

             


    
   
    </>
    
  );
}
