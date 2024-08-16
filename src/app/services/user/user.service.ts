import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private apiUrl = 'http://172.16.1.10:3024/api/crear-usuarios';
  private getUser = 'http://172.16.1.10:3024/api/get-all-users';
  private updatetUser = 'http://172.16.1.10:3024/api/editar-usuarios';
  private getUserNameUrl = 'http://172.16.1.10:3024/api/get-nombre-usuario';
                     

  constructor(private http: HttpClient) { }
  
  createUser(data : any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { data});
  }
  
  getAllUser(): Observable<any> {
    return this.http.get<any>(this.getUser);
  }

  updateUser(dataEdit:any): Observable<any> {
    console.log("dataEDit" , dataEdit);
    return this.http.put<any>(this.updatetUser, dataEdit);
  }

  // Método para verificar si el username ya existe
  usernameExists(username: string): Observable<boolean> {
    const url = `${this.getUserNameUrl}?username=${username}`;
    return this.http.get<boolean>(url);
  }

}

