const config = require('../shared/config');

const db = config.db;

// ? Documentacion de Google sobre queries
// ? https://firebase.google.com/docs/firestore/query-data/queries

// * *************************************
// * FUNCIONES UTILITARIAS
// * *************************************

const mostrarTitulo = (titulo) => {
  console.log('\n');
  console.log(`************ ${titulo} ************`);
};

const mostrarLibro = (libro) => {
  let allTags = '';
  libro.tags.forEach((tag) => {
    allTags += `[${tag}] `;
  });

  console.log(
    `"${libro.titulo}", escrito por ${libro.autor} en ${libro.pub} | Cat: ${libro.categoria} | Tags: ${allTags}`
  );
};

// * *************************************
// * Obtener un elemento por su id
// * *************************************
const libroId = 'cads';

const libroRef = db.collection('libros').doc(libroId);
// console.log({libroRef});
libroRef.get().then((libro) => {
  // console.log({libro});
  // console.log(libro.data());
  mostrarTitulo(`Busqueda de libro con id ${libroId}`);
  mostrarLibro(libro.data());
});

// * *************************************
// * Actualizar registro
// * *************************************
// const libroIdAcualizar = 'cyc';
// const libroPorActualizar = db.collection('libros').doc(libroIdAcualizar);
// libroPorActualizar.get().then((value) => {
//   let datos = value.data();
//   datos.titulo = datos.titulo + new Date().getMilliseconds().toString();

//   // ! Aqui se actualiza!
//   db.collection('libros')
//     .doc(libroIdAcualizar)
//     .update(datos)
//     .then(() => {
//       mostrarTitulo(`Libro con id ${libroIdAcualizar} actualizado`);
//     });
// });

// * *************************************
// * Buscar libros por un valor
// * *************************************
const libros = db.collection('libros').where('categoria', '==', 'Misterio');
libros.get().then((value) => {
  mostrarTitulo(`Busqueda de libros de misterio`);
  // ! value es un arreglo de DocumentSnapshots
  value.forEach((item) => {
    // console.log(item.data());
    mostrarLibro(item.data());
  });
});

// * *************************************
// * Buscar libros con ciertas categorias
// * *************************************
const librosFantasiaMisterio = db
  .collection('libros')
  .where('categoria', 'in', ['Fantasía', 'Misterio']);
librosFantasiaMisterio.get().then((value) => {
  mostrarTitulo(`Busqueda de libros de fantasia y misterio`);
  value.forEach((item) => {
    // console.log(item.data());
    mostrarLibro(item.data());
  });
});

// * *************************************
// * Buscar libros con ciertas categorias y año (AND)
// * *************************************
const librosMisterioSiglo20 = db
  .collection('libros')
  .where('categoria', '==', 'Misterio')
  .where('pub', '>=', 1900);
librosMisterioSiglo20.get().then((value) => {
  mostrarTitulo(`Busqueda de libros de misterio del siglo XX`);
  value.forEach((item) => {
    // console.log(item.data());
    mostrarLibro(item.data());
  });
});

// * *************************************
// * Libros que NO son de Misterio
// * *************************************
(async () => {
  // ! firestore no tiene el operador NOT (!=), por lo que hay que hacer 2 queries y combinarlos
  // ! aqui usamos async/await para ilustrarlo
  try {
    const librosNoMisterio1 = await db
      .collection('libros')
      .where('categoria', '>', 'Misterio')
      .get();
    const librosNoMisterio2 = await db
      .collection('libros')
      .where('categoria', '<', 'Misterio')
      .get();

    mostrarTitulo(`Libros que NO son de misterio`);
    librosNoMisterio1.forEach((item) => {
      mostrarLibro(item.data());
    });
    librosNoMisterio2.forEach((item) => {
      mostrarLibro(item.data());
    });
  } catch (e) {
    console.error(e);
  }
})();

// * *************************************
// * Libros cuyo autor inicia con Carlos
// * *************************************
(async () => {
  const inicio = 'Carlos';

  // ? Truco: startsWith("Carlos") puede verse como buscar "Carlos*" pero no "Carlot" (t = s + 1)
  const fin = inicio.replace(/.$/, (c) => String.fromCharCode(c.charCodeAt(0) + 1));
  console.log({inicio});
  console.log({fin});

  const librosDeCarlos = await db
    .collection('libros')
    .where('autor', '>=', inicio)
    .where('autor', '<', fin)
    .get();

  mostrarTitulo(`Libros cuyo autor inicia con "Carlos"`);
  librosDeCarlos.forEach((item) => {
    mostrarLibro(item.data());
  });
})();

// * *************************************
// * Listar y ordenar
// * *************************************
// const librosOrdenados = db.collection('libros').orderBy('pub');
const librosOrdenados = db.collection('libros').orderBy('pub', 'desc');
// const librosOrdenados = db.collection('libros').orderBy('pub').limit(5);
librosOrdenados.get().then((value) => {
  mostrarTitulo(`Busqueda de libros ordenados`);
  value.forEach((item) => {
    // console.log(item.data());
    mostrarLibro(item.data());
  });
});

// * *************************************
// * Libros que contengan el tag [latino]
// * *************************************
const librosLatinos = db.collection('libros').where('tags', 'array-contains', 'latino');
librosLatinos.get().then((value) => {
  mostrarTitulo(`Libros con tag [latino]`);
  value.forEach((item) => {
    // console.log(item.data());
    mostrarLibro(item.data());
  });
});

// Cerramos el app con la funcion utilitaria
config.closeApp();
