import { Box, Container } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Avatar, Typography } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import AgregarLibroForm from '../components/agregarLibroForm/AgregarLibroForm';

const StyledRoot2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}));

export default function () {
  const mdUp = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title> Añadir Libro| RentARead </title>
      </Helmet>

      {mdUp && (
        <Container maxWidth="sm" class="container-sm" sx={{ marginBottom: '100%' }}>
          <StyledRoot2>
            <Box
              style={{
                position: 'absolute',
                left: '50%',

                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                  Agregar Libro
                </Typography>
                <Avatar
                  variant="rounded"
                  alt="Login"
                  src={'/static/libro1.png'}
                  style={{ width: '12vh', height: '15vh', marginLeft: '20px', marginBottom: '40px' }}
                />
              </div>

              <AgregarLibroForm />
            </Box>
          </StyledRoot2>
        </Container>
      )}
    </>
  );
}
