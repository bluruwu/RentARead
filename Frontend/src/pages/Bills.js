import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import swal from 'sweetalert';
// @mui
import {
  Card,
  Table,
  Stack,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  Button,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Customer from './Customer';
import Label from '../components/label';

import PaymentPage from './PaymentPage';
import Payment from './Payment';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock
import BILLIST from '../_mock/bills';
import account from '../_mock/account';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'billID', label: 'ID', alignRight: false },
  { id: 'expeditionDate', label: 'Fecha de expedición', alignRight: false },
  { id: 'expirationDate', label: 'Fecha de vencimiento', alignRight: false },
  { id: 'value', label: 'Valor', alignRight: false },
  { id: 'status', label: 'Estado', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

BillsPage.defaultProps = {
  customer: true,
};

export default function BillsPage(props) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [goToPay, setGoToPay] = useState(false);

  const [goToPayOnline, setGoToPayOnline] = useState(false);

  const [billSelected, setBillSelected] = useState();

  const [billStatus, setBillStatus] = useState();

  const handleOpenMenu = (event, bill, bstatus) => {
    setBillSelected(bill);
    setBillStatus(bstatus);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const errorAlert = () => {
    swal({
      title: 'No se puede pagar',
      text: 'La factura ya está paga',
      icon: 'warning',
      button: 'Aceptar',
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = BILLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  function goBackButton(customer) {
    const buttonback = (
      <Button
        variant="contained"
        startIcon={<Iconify icon="ri:arrow-go-back-fill" />}
        onClick={() => {
          setGoBack(true);
        }}
      >
        Volver a Clientes
      </Button>
    );

    if (!customer) return buttonback;
    return null;
  }

  function payButton(customer) {
    const buttonPay1 = (
      <MenuItem
        onClick={() => {
          if (billStatus === 'pendiente') {
            setGoToPay(true);
          } else {
            errorAlert();
          }
        }}
      >
        <Iconify icon={'fluent:payment-28-filled'} sx={{ mr: 2 }} />
        Pagar
      </MenuItem>
    );

    const buttonPay2 = (
      <MenuItem
        onClick={() => {
          if (billStatus === 'pendiente') {
            setGoToPayOnline(true);
          } else {
            errorAlert();
          }
        }}
      >
        <Iconify icon={'fluent:payment-28-filled'} sx={{ mr: 2 }} />
        Pagar
      </MenuItem>
    );

    if (!customer) return buttonPay1;
    return buttonPay2;
  }

  function Title(name) {
    const title1 = (
      <Typography variant="h4" gutterBottom>
        {' '}
        Recomendaciones
      </Typography>
    );
    const title2 = (
      <Typography variant="h4" gutterBottom>
        {' '}
        Facturas de {name}
      </Typography>
    );
    if (name === undefined) return title1;
    return title2;
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - account.facturas.length) : 0;

  const filteredUsers = applySortFilter(account.facturas, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [goBack, setGoBack] = useState(false);

  if (goBack) {
    return <Customer />;
  }

  if (goToPay) {
    return <Payment name={props.name} idBill={billSelected} />;
  }

  if (goToPayOnline) {
    return <PaymentPage idBill={billSelected} />;
  }

  const estado = 'success';
  return (
    <>
      <Helmet>
        <title> Facturas </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {Title(props.name)}
          </Typography>
          {goBackButton(props.customer)}
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={account.facturas.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {account.facturas.map((celda) => (
                    <TableRow
                      hover
                      key={celda.id_factura}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selected.indexOf(celda.id_factura) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.indexOf(celda.id_factura) !== -1}
                          onChange={(event) => handleClick(event, celda.id_factura)}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" padding="2rem">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {celda.id_factura}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{celda.fecha_vencimiento}</TableCell>

                      <TableCell align="left">{celda.fecha_corte}</TableCell>

                      <TableCell align="left">{celda.costo}</TableCell>

                      <TableCell align="left">
                        <Label color={(estado === 'pendiente' && 'error') || 'success'}>{sentenceCase(estado)}</Label>
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={(event) => handleOpenMenu(event, celda.id_factura, estado)}
                        >
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={account.facturas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {payButton(props.customer)}

        <MenuItem>
          <Iconify icon={'material-symbols:content-paste-search'} sx={{ mr: 2 }} />
          Ver
        </MenuItem>
      </Popover>
    </>
  );
}
