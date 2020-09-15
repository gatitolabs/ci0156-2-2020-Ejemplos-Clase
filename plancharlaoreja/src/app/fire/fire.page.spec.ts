import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FirePage} from './fire.page';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {generarFirestoreStub} from '../shared/unit-test-utils';
import {FormsModule, NgForm} from '@angular/forms';

// ! Necesita una conexion a Firebase (en la nube)
// import {AngularFireModule} from '@angular/fire';
// import {AngularFirestoreModule} from '@angular/fire/firestore';
// import {environment} from 'src/environments/environment';

// ! SOLO EJECUTAR ESTAS PRUEBAS
fdescribe('FirePage', () => {
  let component: FirePage;
  let fixture: ComponentFixture<FirePage>;

  // * Mock de datos de un libro
  // * incluye el metodo data() que usa firestore
  // const datosLibro = {
  //   data() {
  //     return {title: 'Titulito', author: 'Autor', pub: 1234};
  //   }
  // };

  // * Stub de firestore, que tiene una interfaz igual a lo que usamos en fire.page
  // const firestoreStub = {
  //   collection: (name: string) => ({
  //     valueChanges: () => new BehaviorSubject([]),
  //     doc: (id: string) => ({
  //       ref: {
  //         get: () => new Promise((resolve) => resolve(datosLibro))
  //       }
  //     })
  //   })
  // };

  const datosLibro = {
    title: 'Los Pollitos',
    author: 'Carmen Lyra',
    pub: 1950
  };

  const firestoreStub = generarFirestoreStub(datosLibro);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirePage],
      imports: [
        IonicModule.forRoot(),
        FormsModule
        // ! Necesita una conexion a Firebase (en la nube)
        // AngularFireModule.initializeApp(environment.firebaseConfig),
        // AngularFirestoreModule
      ],
      providers: [{provide: AngularFirestore, useValue: firestoreStub}]
    }).compileComponents();

    fixture = TestBed.createComponent(FirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and call reset', () => {
    // * creamos un formulario con datos fijos
    // * solo nos interesa la estructura que usa la pagina
    // * que son el reset() y el value.
    const testForm = {
      value: {
        title: 'patito',
        content: 'los patitos'
      },
      reset() {}
    } as NgForm;

    // * vamos a crear un Spy para el metodo
    // * reset() del formulario

    const resetSpy: jasmine.Spy = spyOn(testForm, 'reset');

    // * ejecutamos la funcion onSubmit del componente
    // * FirePage (ver fire.page.ts)
    component.onSubmit(testForm);

    // * reviso que el metodo reset() haya sido invocado
    expect(resetSpy).toHaveBeenCalled();

    // * verificar que el reset() se haya llamado solo 1 vez
    expect(resetSpy.calls.all().length).toEqual(1);
  });
});
