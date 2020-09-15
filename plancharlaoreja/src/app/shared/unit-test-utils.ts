import {BehaviorSubject} from 'rxjs';

/**
 * Genera un stub de Firestore con las funciones collection.valueChanges y collection.doc()
 * @param datosGet los datos que se devuelven cuando se ejecuta doc.get()
 * @param datosValueChangesCollection arreglo de datos que se devuelven cuando se ejecuta .collection('...').valueChanges()
 * @param datosValueChangesDoc datos que se devuelven cuando se ejecuta doc.valueChanges()
 * @returns un objeto stub de Firestore
 */
export const generarFirestoreStub = (
  datosGet: any = {},
  datosValueChangesCollection: any = [],
  datosValueChangesDoc: any = {}
) => {
  return {
    collection: (name: string) => ({
      valueChanges: () => new BehaviorSubject(datosValueChangesCollection),
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject(datosValueChangesDoc),
        set: (d: any) => new Promise((resolve, reject) => resolve()),
        ref: {
          get: () =>
            new Promise((resolve, reject) =>
              resolve({
                data() {
                  console.log('estoy en el stub');
                  return datosGet;
                }
              })
            )
        }
      })
    })
  };
};
