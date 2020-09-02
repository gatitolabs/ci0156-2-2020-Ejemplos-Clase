import * as functions from 'firebase-functions';

// ? Documentacion => https://cloud.google.com/functions/docs/writing/http

// * Ejemplo basico (GET)
export const getBasico = functions.https.onRequest((request, response) => {
  response.send('este es un mensaje feliz!');
});

// * Ejemplo basico de GET con parametros (?param1=valor1&param2=valor2)
export const getBasicoConParams = functions.https.onRequest((request, response) => {
  // ? http://host/url?nombre=algo&apellido=otracosa
  const nombre = request.query.nombre;
  const apellido = request.query.apellido;
  console.log(`llego esto de nombre: ${nombre} | apellido: ${apellido}`);

  if (!nombre || !apellido) {
    response.status(400).send('ERROR falta el nombre o el apellido');
    return;
  }

  response.send(`hola hola ${nombre} ${apellido}`);
});

// * Ejemplo usando POST con x-www-form-urlencoded
export const ejemploPost = functions.https.onRequest((request, response) => {
  // ? Metodo HTTP (GET, POST, etc)
  const method = request.method;
  console.log({method});

  if (method !== 'POST') {
    response.status(400).send('Yo solo funciono en POST');
    return;
  }

  // ? Content Type del request
  const contentType = request.get('content-type');
  console.log({contentType});

  const nombre = request.body.nombre;
  const apellido = request.body.apellido;
  console.log({nombre});
  console.log({apellido});

  response.send('hola desde post');
});

interface Datico {
  nombre: string;
  apellido: string;
}

// * Ejemplo usando POST con JSON
export const ejemploPostJson = functions.https.onRequest((request, response) => {
  // ? Metodo HTTP (GET, POST, etc)
  const method = request.method;
  console.log({method});

  if (method !== 'POST') {
    response.status(400).send('Yo solo funciono en POST');
    return;
  }

  // ? Content Type del request
  const contentType = request.get('content-type');
  console.log({contentType});

  // ! Este bloque va a fallar, porque {} no tiene definidas las propiedades "nombre" o "apellido"
  // const datoMalo: {} = request.body;
  // console.log({datoMalo});
  // console.log(datoMalo.nombre);
  // console.log(datoMalo.apellido);

  // ? usamos "any" como tipo de dato
  const data: any = request.body;
  console.log({data});
  console.log(data.nombre);
  console.log(data.apellido);

  // ? usamos un type definido inline
  const data2: {nombre: string; apellido: string} = request.body;
  console.log({data2});
  console.log(data2.nombre);
  console.log(data2.apellido);

  // ? usamos un type declarado arriba (interface Datico)
  const data3: Datico = request.body;
  console.log({data3});
  console.log(data3.nombre);
  console.log(data3.apellido);

  // ? sacamos el resultado como un string
  const str = request.body;
  console.log(str);

  response.send('hola desde post');
});
