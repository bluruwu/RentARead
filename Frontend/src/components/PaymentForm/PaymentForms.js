import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import swal from 'sweetalert';
import './index.css';
import Cookies from 'js-cookie';
import CSRFToken from '../csrftoken';

export default function PaymentForms() {
  const confirmacion = () => {
    swal({
      text: 'Se ha añadido el pago a tu factura',
      icon: 'success',
      button: 'Aceptar',
    });
  };

  const error = () => {
    swal({
      text: 'No se ha podido añadir el pago a tu factura',
      icon: 'Error',
      button: 'Aceptar',
    });
  };

  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e) => {
    setState({
      ...state,
      focus: e.target.name,
    });
  };
  // POST
  const [data, setData] = useState({
    id_factura: '',
    cantidad: '',
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  const [goToDashboard, setGoToDashboard] = useState(false);
  const url = 'http://127.0.0.1:8000/api/pagaronline';

  function submit(e) {
    e.preventDefault();
    try {
      fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if ('success' in data) {
            confirmacion();
            setGoToDashboard(true);
          } else {
            error();
          }
        });
    } catch (error) {
      console.warn(error);
    }
  }

  if (goToDashboard) {
    return <Navigate to="/dashboard/user" />;
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <Cards number={state.number} name={state.name} expiry={state.expiry} cvc={state.cvc} focused={state.focus} />
          <form>
            <div className="form-group">
              <label htmlFor="number">
                Número de la tarjeta
                <input
                  type="text"
                  name="number"
                  id="number"
                  maxLength="16"
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="name">
                Nombre
                <input
                  type="text"
                  name="name"
                  id="name"
                  maxLength="30"
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
              </label>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="expiry">
                  Fecha de expiración
                  <input
                    type="text"
                    name="expiry"
                    id="expiry"
                    maxLength="4"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cvc">
                  CVC
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    maxLength="4"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="billID">
                  ID de factura
                  <input
                    onChange={(e) => handle(e)}
                    value={data.id_factura}
                    type="text"
                    label="ID de la factura"
                    id="id_factura"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="cantidad-a-pagar">
                  Cantidad a pagar
                  <input
                    onChange={(e) => handle(e)}
                    value={data.cantidad}
                    type="text"
                    name="cantidad-a-pagar"
                    id="cantidad"
                    className="form-control"
                  />
                </label>
              </div>
            </div>
          </form>
          <Stack spacing={2}>
            <Button onClick={(e) => submit(e)} variant="contained" fullWidth sx={{ m: 1 }}>
              Pagar
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
