import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}
  ngOnInit(): void {
    let numero = 10;

    // tslint:disable-next-line: no-debugger
    // debugger;

    numero += 10;
    numero *= 5;

    console.log({numero});
  }

  performLogout() {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Error al hacer logout', {error});
        this.router.navigate(['/login']);
      });
  }
}
