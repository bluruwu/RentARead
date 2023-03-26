import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/images/avatars/avatar_${index + 1}.jpg`,
  name: sample(['El Conde de Montecristo', 'El Principito', '1984', 'El Túnel', 'Historia de Dos Ciudades']),
  userID: faker.datatype.number(),
  isInMora: faker.datatype.boolean(),
  status: sample(['Para Venta', 'Para Renta', 'Para Intercambio']),
  role: sample(['Terror', 'Policíaco', 'Romance', 'Drama']),
}));

export default users;
