import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const dbTriggerOnCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snapshot, context) => {
    console.log('entrando al onCreate');
    const data = snapshot.data();
    console.log({data});
    const logRef = db.doc(`logcol/${snapshot.id}`);

    return logRef.set({
      mensaje: JSON.stringify(data),
      createdAt: context.timestamp
    });
  });
