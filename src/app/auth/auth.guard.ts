import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    
    const token = localStorage.getItem('authToken');
    
    const isLoggedIn = !!localStorage.getItem('authToken'); // Verifica si hay un token en el almacenamiento local

    if (!isLoggedIn  || this.isTokenExpired(token)) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }

    return true;
  }

  // Método para verificar si el token ha expirado
  isTokenExpired(token: string): boolean {
    localStorage.removeItem('authToken');
    
    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true; // Si no se puede decodificar o no tiene fecha de expiración, se considera expirado
    }

    const expirationDate = new Date(decodedToken.exp * 1000); // Convierte la fecha de expiración en milisegundos
    return expirationDate < new Date(); // Compara la fecha de expiración con la fecha actual
  }

    // Método para decodificar el token
    decodeToken(token: string): any {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
}
