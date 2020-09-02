const faker = require('faker');
const config = require('../shared/config');

const db = config.db;

// Inicializar faker
faker.seed(123);

const generarDatos = async function () {
  Array(10)
    .fill(0)
    .forEach(async (_) => {
      const resultado = await db.collection('userAsync').add(faker.helpers.userCard());
      console.log(`Creando usuarioAsync con id ${resultado.id}`);
    });
  return true;
};

console.log('comenzando');
generarDatos();
console.log('listo');

// Cerramos el app con la funcion utilitaria
config.closeApp();
