import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Avatar, Box, List, ListItemText } from '@mui/material';
// components
import NavBar from '../components/nav-section/NavBar';
// hooks
import useResponsive from '../hooks/useResponsive';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '100%',
  },
}));

const StyledRoot2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
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

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Home | RentARead </title>
      </Helmet>
      <NavBar />
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" paragraph>
              RentARead
              <Typography sx={{ color: 'text.secondary' }}>
                <p>
                  Nos complace darle la bienvenida a RentARead, nuestra página web de alquiler de libros en línea,
                  nos apasiona la lectura y creemos que todos deberían tener acceso a una amplia variedad de libros.
                  Nuestro servicio de alquiler de libros en línea ofrece una experiencia de lectura única y cómoda 
                  que le permitirá acceder a una amplia selección de libros desde la comodidad de su hogar.
                </p>{' '}
                <p>
                  Le invitamos a explorar nuestra colección de libros y a experimentar todo lo que RentARead tiene que ofrecer. 
                  Esperamos ser su destino número uno para la lectura en línea y ayudarle a descubrir nuevos títulos y 
                  autores que le apasionarán. ¡Gracias por elegir RentARead!
                </p>
              </Typography>
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 360 }}>
              <List>
                <ListItemText primary="CONTACTO" />
                <ListItemText primary="Teléfono: 602-4552330" />
                <ListItemText primary="Email: rentaread@gmail.com" />
                <ListItemText primary="GitHub: https://github.com/bluruwu/RentARead" />
              </List>
            </Box>
          </StyledContent>
        </Container>

        <StyledRoot2>
          {mdUp && (
            <Avatar
              variant="rounded"
              alt="login"
              src={'/static/HomePage2.jpg'}
              style={{
                width: 'auto',
                height: '50vh',
              }}
            />
          )}
        </StyledRoot2>
      </StyledRoot>
    </>
  );
}
