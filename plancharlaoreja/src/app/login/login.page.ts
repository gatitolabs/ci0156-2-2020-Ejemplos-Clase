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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const userEmail = form.value.email;
    const userPassword = form.value.password;

    this.firebaseAuth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((userData) => {
        console.log({userData});
        this.router.navigate(['/home']);
      })
      .catch(async (error) => {
        const toast = await this.toaster.create({
          header: 'Error',
          message: error.message,
          position: 'bottom',
          duration: 3000
        });
        toast.present();
      });
  }
}
