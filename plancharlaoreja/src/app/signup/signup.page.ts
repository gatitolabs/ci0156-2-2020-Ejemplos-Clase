import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private toaster: ToastController
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const userEmail = form.value.email;
    const userPassword = form.value.password;
    const userName = form.value.nombre;

    this.firebaseAuth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(async (userData) => {
        console.log({userData});
        form.reset();
        const toast = await this.toaster.create({
          header: 'Exito 🚀',
          message: 'Listo para autenticarse',
          position: 'top',
          duration: 3000
        });
        toast.present();
        this.router.navigate(['/login']);
      })
      .catch(async (err) => {
        const toast = await this.toaster.create({
          header: 'Error',
          message: err.message,
          position: 'top',
          duration: 3000
        });
        toast.present();
      });
  }
}
