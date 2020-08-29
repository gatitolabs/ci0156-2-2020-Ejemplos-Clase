import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private toaster: ToastController
  ) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const userEmail = form.value.email;
    const userPassword = form.value.password;

    // * Implementacion con Promesas
    // this.firebaseAuth
    //   .signInWithEmailAndPassword(userEmail, userPassword)
    //   .then((userData) => {
    //     console.log({userData});
    //     this.router.navigate(['/home']);
    //   })
    //   .catch(async (error) => {
    //     const toast = await this.toaster.create({
    //       header: 'Error',
    //       message: error.message,
    //       position: 'bottom',
    //       duration: 3000
    //     });
    //     toast.present();
    //   });

    // * Implementacion con async/await

    try {
      const resultado = await this.firebaseAuth.signInWithEmailAndPassword(userEmail, userPassword);
      console.log({resultado});
      this.router.navigate(['/home']);
    } catch (e) {
      console.log({e});
      const toast = await this.toaster.create({
        header: 'Error',
        message: e.message,
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }
  }
}
