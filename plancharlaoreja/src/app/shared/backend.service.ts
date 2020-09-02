import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  callProtectedApi(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    return this.http
      .get<string>('https://us-central1-ejemplo-ci0156.cloudfunctions.net/api/dog', httpOptions)
      .toPromise();
  }
}
