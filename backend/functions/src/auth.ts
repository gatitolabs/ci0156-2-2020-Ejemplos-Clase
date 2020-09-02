import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUser = functions.auth.user().onCreate((user, context) => {
  const userRef = db.doc(`users/${user.uid}`);
  return userRef.set({
    name: 'Juanito',
    email: user.email,
    createdAt: context.timestamp
  });
});

export const deleteUser = functions.auth.user().onDelete((user, context) => {
  console.log(`Se nos fue ${user.uid} | ${user.email}`);
  const userRef = db.doc(`users/${user.uid}`);
  return userRef.delete();
});
