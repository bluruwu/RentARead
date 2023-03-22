import { Box, Container } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { styled } from '@mui/material/styles';
import Logo from '../components/logo';
import EditUserForm from "../components/editUserForm/EditUserForm";
import useResponsive from "../hooks/useResponsive";


const StyledRoot2 = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
  }));
  
  export default function EditUser(){
    const mdUp = useResponsive('up', 'md');
    return( 
    <>
    <Helmet>
        <title> Editar | RentARead </title>
    </Helmet>
    <Container maxWidth='sm' class="container-sm">
    <StyledRoot2>
    {mdUp && (
        <Logo style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}/>)}
        {/* debe ir el tamaño del container dividido entre 2 */}
       
        <Box style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
        }}>
            <h1>Editar una cuenta</h1>
            <EditUserForm/>
        </Box>


    </StyledRoot2>

    </Container>

    </>
    )
  }