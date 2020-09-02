const faker = require('faker');
const config = require('../shared/config');

const db = config.db;

// Inicializar faker
faker.seed(123);

console.log('comenzando');

// * Usando un for normal
for (let i = 0; i < 10; i++) {
  db.collection('usuario')
    .add(faker.helpers.createCard())
    .then((val) => {
      console.log(`Nuevo usuario con id ${val.id}`);
    });
}

// * Version mas sofis
Array(10)
  .fill(0)
  .forEach((_) => {
    db.collection('usuarioSofis')
      .add(faker.helpers.createCard())
      .then((val) => {
        console.log(`Nuevo usuario sofis con id ${val.id}`);
      });
  });

console.log('listo');

// Cerramos el app con la funcion utilitaria
config.closeApp();
