import { Helmet } from "react-helmet-async";
import { useState, React} from "react";
import { Button, Container, Stack, Typography} from "@mui/material";
import Iconify from "../components/iconify";
import PaymentForms from "../components/PaymentForm/PaymentForms";
import Customer from './Customer';
import Bills from './Bills';

export default function PaymentPage(props) {

    const [goBack, setGoBack] = useState(false);

    const [goToCustomer, setGoToCustomer] = useState(false);

    if (goBack) {
        return <Bills  name={props.name} />;
      }
    
      if (goToCustomer) {
        return <Customer/>
      }
    

    return(
        <>
            <Helmet>
                <title> Pagos en línea | WATTPAY</title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Pagos en línea
                    </Typography>
                        <Button
                            onClick={() => {
                                setGoBack(true);
                            }}
                            variant="contained" startIcon={<Iconify icon="ri:arrow-go-back-fill" />}>
                            Volver
                        </Button>

                </Stack>
            <div className="layout">
                <PaymentForms />
            </div>    
            </Container>
            
        </>    
    )
}