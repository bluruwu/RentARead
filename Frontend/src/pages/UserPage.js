import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import Cookies from 'js-cookie';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Box,
 
} from '@mui/material';
// components
import EditUserForm from '../components/editUserForm/EditUserForm';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import RegisterForm from '../components/registerForm';
import account from '../_mock/account';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'userID', label: 'ID', alignRight: false },
  { id: 'role', label: 'Tipo', alignRight: false },
  { id: 'isInMora', label: 'En Mora', alignRight: false },
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


// Mora
const urll = 'http://127.0.0.1:8000/api/mora';

const consultaMora = (value) => {
  fetch(urll, {
  method: 'POST',
  body: JSON.stringify({'cedula': value }),
  headers: { 'Content-Type': 'application/json' }
})
 .then(res => res.json())
 .then(data => {
  let cambio = '';
    if (String(data.success) === 'En mora') 
    {
      cambio = 'Si';
    } 
    else if (String(data.success) === 'Facturas al día' || 'Facturas pendientes') 
    {
      cambio = 'No';
    }
    return cambio;
 }) 
}


export default function UserPage() {
  const [open, setOpen] = useState(null);
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentUser,setCurrentUser]=useState({
    cedula:'',
    nombre:'',
    correo_electronico:'',
    telefono:'',
    estado_usuario:''
  })



  const closeModal= ()=>{
    setIsOpenModal(false);
  }
  const handleOpenMenu = (event,user) => {
    setCurrentUser(user);
    setOpen(event.currentTarget);
    console.log(currentUser);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;
  const [goToRegister, setGoToRegister] = useState(false);
  if (goToRegister) {
    return <Navigate to="/register" />;
  }
  const openModal=(e)=>{
    
    
    setIsOpenModal(true)
  }

  const urlModifyUserState='';
  const modifyUserState=()=>{
    const test ={
      cedula:currentUser.cedula
    }
    window.location.reload(false);
  }

  return (
    <>
      <Helmet>
        <title> Usuarios </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>
          <Button
            onClick={() => {
              setGoToRegister(true);
            }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo Usuario
          </Button>
        </Stack>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {account.lista.map(celda => 
                   
                    
                      <TableRow hover key={celda.cedula} tabIndex={-1} role="checkbox" selected={selected.indexOf(celda.nombre) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selected.indexOf(celda.nombre) !== -1} onChange={(event) => handleClick(event, celda.nombre)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={celda.nombre} src={`../../public/static/images/avatars/avatar_${1 + 1}.jpg`} />
                            <Typography variant="subtitle2" noWrap>
                              {celda.nombre}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{celda.cedula}</TableCell>
                        <TableCell align="left">{'Cliente'}</TableCell>
                        <TableCell align="left">{consultaMora(celda.cedula) ? 'Si' : 'No'}</TableCell>
                        <TableCell align="left">
                          <Label color={(celda.estado_usuario === 'inactivo' && 'error') || 'success'}>{sentenceCase(celda.estado_usuario)}</Label>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e)=>handleOpenMenu(e,celda)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>
                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
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
        <MenuItem onClick={(e)=>openModal(e)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}  />
          Editar
        </MenuItem>
        <MenuItem sx={{ mr:2 }}onClick={modifyUserState} >
          <Iconify icon={'eva:checkmark-circle-2-outline'} sx={{ mr: 2 }}  />
          Activar/Inactivar
        </MenuItem>
      </Popover>
      <Modal open={isOpenModal} onClose={closeModal}>
        <Container>
        <Box sx={{
          position: 'absolute',
          left: '25%',
          top: '29%',
          width: '50%',
          height: '30%',
          backgroundColor: 'white',
        }} >
        <EditUserForm/>
          
        </Box>
        </Container>
      </Modal>
      
    
    </>
  );
}
