const config = require('../shared/config');

const db = config.db;

const libros = [
  {
    key: 'cads',
    data: {
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      pub: 1967,
      categoria: 'Ficción',
      tags: ['novela', 'latino', 'español']
    }
  },
  {
    key: 'cyc',
    data: {
      titulo: 'Crimen y Castigo',
      autor: 'Fiodor Dostoyevski',
      pub: 1860,
      categoria: 'Misterio',
      tags: ['novela', 'psicologica', 'rusia']
    }
  },
  {
    key: 'ep',
    data: {
      titulo: 'El Principito',
      autor: 'Antoine De Saint-Exupéry',
      pub: 1930,
      categoria: 'Ficción',
      tags: ['novela', 'corta', 'francia', 'fábula', 'infantil']
    }
  },
  {
    key: 'cap',
    data: {
      titulo: 'Cuentos de Angustias y Paisajes',
      autor: 'Carlos Salazar Herrera',
      pub: 1940,
      categoria: 'Misterio',
      tags: ['tico', 'realismo magico', 'cuentos', 'corto', 'latino', 'español']
    }
  },
  {
    key: 'sa',
    data: {
      titulo: 'El Señor de los Anillos',
      autor: 'JRR Tolkien',
      pub: 1954,
      categoria: 'Fantasía',
      tags: ['inglés', 'película', 'épica', 'británico']
    }
  },
  {
    key: 'gyg',
    data: {
      titulo: 'Gentes y gentecillas',
      autor: 'Carlos Luis Fallas',
      pub: 1947,
      categoria: 'Realismo',
      tags: ['tico', 'realismo magico', 'cuentos', 'corto', 'latino', 'español']
    }
  }
];

libros.forEach((item) => {
  // ? para asignar un uid especifico al document
  // ? usar doc(el_uid_custom).set(datos_por_insertar)
  db.collection('libros').doc(item.key).set(item.data);
});

// Cerramos el app con la funcion utilitaria
config.closeApp();
