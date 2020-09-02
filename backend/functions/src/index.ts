// * Inicializar app de firebase, asi no hay que inicializarla en otros lugares
import * as admin from 'firebase-admin';
admin.initializeApp();

export {createUser, deleteUser} from './auth';
