import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

interface Libro {
  author: string;
  title: string;
  pub: number;
}

@Component({
  selector: 'app-fire',
  templateUrl: './fire.page.html',
  styleUrls: ['./fire.page.scss']
})
export class FirePage implements OnInit {
  librosObservable: Observable<Libro[]>;

  constructor(private fire: AngularFirestore) {}

  ngOnInit() {
    // ? Enlaces AngularFire
    // ? https://github.com/angular/angularfire
    // ? https://firebaseopensource.com/projects/angular/angularfire2/

    const doc = this.fire.collection('libros').doc('Uu6sakc7oKLAzZjzHF2P').ref;

    doc.get().then((res) => {
      const libro: Libro = res.data() as Libro;
      console.log(`Info del libro: ${libro.title} de ${libro.author} año ${libro.pub}`);
    });

    // * Se trae todo lo de la coleccion libros en el orden que caiga
    // this.librosObservable = this.fire.collection<Libro>('libros').valueChanges();

    // * Uso de filtros en un observable
    this.librosObservable = this.fire
      .collection<Libro>('libros', (ref) => ref.where('pub', '>', 1900).orderBy('pub', 'desc'))
      .valueChanges();

    // * Obtener referencia de la coleccion por si deseo usarla luego
    // const librosRef: AngularFirestoreCollection<Libro> = this.fire.collection<Libro>(
    //   'libros',
    //   (ref) => ref.where('pub', '>', 1900).orderBy('pub', 'desc')
    // );
    // librosRef.valueChanges()

    // console.log(this.librosObservable);
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const content = form.value.content;
    console.log({title});
    console.log({content});
    // * Magia magia....
    form.reset();
    // * mas magia, mas magia...
    // ! esto va a hacer que la prueba de unidad falle
    // form.reset();
  }
}
