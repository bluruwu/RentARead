import { faker } from '@faker-js/faker';


// ----------------------------------------------------------------------

  const librosP = [
  "1984",
  "El Conde de Montecristo",
  "María",
  "El Psicoanalista",
 " El Túnel",
  "Cien años de Soledad"
    

 ];

 const genero =[
  "Novela",
  "Clásico",
  "Novela",
  "Suspenso",
 " Psicológica",
  "Novela"
    

 ];
 const Autor = [
  "George Orwell",
  "Alejandro Dumas",
  "Jorge Isaacs",
  "John Katzenbach",
 " Ernesto Sábato",
  "Gabriel García Márquez"
    
 ];
  const Disponibilidad  = [
  "Venta-Renta",
  "Venta",
  "Venta-Renta-Intercambio",
  "Venta-Renta-Intercambio",
  "Venta-Intercambio",
 " Venta-Renta"
    
 ];

const users = [...Array(6)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/images/avatars/${index + 1}.jpeg`,
  name:  librosP[index],
  userID: genero[index],
  isInMora: Autor[index],
  status: Disponibilidad [index],
  
 

}));

export default users;
