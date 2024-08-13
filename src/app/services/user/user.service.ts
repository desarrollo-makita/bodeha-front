import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private apiUrl = 'http://localhost:3024/api/crear-usuarios';
  private getUser = 'http://localhost:3024/api/get-all-users';
                     

  constructor(private http: HttpClient) { }
  
  createUser(data : any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { data});
  }
  
  getAllUser(): Observable<any> {
    return this.http.get<any>(this.getUser);
  }

}

