import { Box, Container } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { styled } from '@mui/material/styles';
import {
 
  Avatar
 
 
} from '@mui/material';
// import useResponsive from "../hooks/useResponsive";
import RegisterPublicityForm from "../components/registerPublicityForm/RegisterPublicityForm";


const StyledRoot2 = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
  }));



  export default function(){
    // const mdUp = useResponsive('up', 'md');
    return(
    <>
    <Helmet>
        <title> Añadir Libro| RentARead </title>
    </Helmet>

    <Container maxWidth='sm' class="container-sm">
        <StyledRoot2>
        <Box style = {{position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)' }}
       >

<div style={{ display: 'flex', alignItems: 'center' }}>
  <h1 style={{ color: 'black', fontSize: '46px', fontFamily: 'Arial Black' }}>
    Agregar Libro
  </h1>
  <Avatar
    variant="rounded"
    alt="Login"
    src={'/static/libro1.png'}
    style={{ width: '12vh', height: '12vh', marginLeft: '20px' }}
  />
</div>

        <RegisterPublicityForm/>



        </Box>

        </StyledRoot2>
    </Container>
    
    </>
    )

  }