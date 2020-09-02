const firebase = require('firebase');
const privateConfig = require('./firebaseconfig');

// * Cargamos configuracion de firebase del archivo que no esta en git
const firebaseConfig = privateConfig.config;

// * Inicializar firebase
firebase.initializeApp(firebaseConfig);

// * Sobreescribir configuracion de firestore para que use el emulador local
// ! OJO => firebase emulators:start debe estar corriendo en algun lugar
// ! OJO => si quitan este bloque, va a escribir directamente en la cuenta de firebase en algun lugar de la nube
firebase.firestore().settings({
  host: 'localhost:8081',
  ssl: false,
  experimentalForceLongPolling: true
});

module.exports = {
  // * Exportamos el acceso a firestore como "db"
  db: firebase.firestore(),
  // * Funcion utilitaria para cerrar la app, luego de 5 segundos
  closeApp: function () {
    console.log('Cerrando app en 5 segundos...');
    setTimeout(() => {
      process.exit(0);
    }, 5000);
  }
};
