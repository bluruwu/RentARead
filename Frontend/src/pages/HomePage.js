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
                  Somos una empresa colombiana que desarrolla software para el manejo de clientes, facturación y recaudo
                  por medio de Internet para empresas de energía eléctrica. Tenemos como proposito facilitar la vida a
                  las empresas y sus clientes ofreciendo software de alta calidad, seguro y fácil de usar.
                </p>{' '}
                <p>
                  Al año 2025 tenemos como propósito proveer de nuestros servicios a otras empresas de energía eléctrica
                  en Latinoamérica y Europa, buscando cumplir con las necesidades y expectativas de las empresas en el
                  exterior.
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
