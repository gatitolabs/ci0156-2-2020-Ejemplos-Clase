import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

// ! Verifica que venga token oAuth2 en el encabezado del request
// ! Para obtener token => usar postman o insomnia con este URL y el JSON con las credenciales
// ! https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=EL_KEY_DE_SU_PROYECTO_DE_FIREBASE
// ! { "email": "usuario@correo.com", "password": "mipasswordsecreto", "returnSecureToken": true }
const auth = async (request: any, response: any, next: any) => {
  if (!request.headers.authorization) {
    response.status(401).send('unauthorized');
    return;
  }

  // * Formato del encabezado => Bearer numerote
  const [authType, token] = request.headers.authorization.trim().split(' ');
  if (authType !== 'Bearer') {
    console.log(`Llego un authType inesperado: ${authType}`);
    response.status(401).send('authorization incorecta');
    return;
  }

  try {
    const userData = await admin.auth().verifyIdToken(token);
    console.log(`Autenticado como uid: ${userData.uid} | ${userData.email}`);
    // console.log({userData});
  } catch (e) {
    console.error(e.message);
    response.status(403).send('token incorrecto');
    return;
  }

  next();
};

const app = express();
// ? middleware intercepta request y le hace algo
app.use(cors({origin: true}));
app.use(auth);

app.get('/cat', (request, response) => {
  response.header('Content-Type', 'application/json');
  response.send('{"mensaje":"soy un gatito"}');
});

app.get('/dog', (request, response) => {
  response.header('Content-Type', 'application/json');
  response.send('{"mensaje":"soy un perrito"}');
});

export const api = functions.https.onRequest(app);
