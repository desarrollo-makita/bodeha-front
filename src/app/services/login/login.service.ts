import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3024/api/login';
                     

  constructor(private http: HttpClient) { }

  login(nombreUsuario: string, clave: string): Observable<any> {
    console.log(nombreUsuario , clave , this.apiUrl)
    return this.http.post<any>(this.apiUrl, { nombreUsuario, clave });
  }
}
