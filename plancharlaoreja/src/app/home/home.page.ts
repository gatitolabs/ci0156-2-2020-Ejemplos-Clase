import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BackendService} from '../shared/backend.service';
import {Plugins, Capacitor} from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  coordenadas = '';
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private backendService: BackendService
  ) {}
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

  async callBackend() {
    try {
      const authToken = await (await this.firebaseAuth.currentUser).getIdToken();
      console.log({authToken});
      const mensaje = await this.backendService.callProtectedApi(authToken);
      console.log({mensaje});
    } catch (e) {
      console.error(e.error);
    }
  }

  getLocation() {
    // https://capacitorjs.com/docs/apis/geolocation
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.error('No hay acceso al GPS');
      return;
    } else {
      Plugins.Geolocation.getCurrentPosition()
        .then((resultado) => {
          console.log({resultado});
          this.coordenadas = resultado.coords.latitude + ',' + resultado.coords.longitude;
          console.log(`Coordenadas => ${this.coordenadas}`);
        })
        .catch((error) => {
          console.error({error});
          console.error('No hay acceso al GPS');
        });
    }
  }
}
