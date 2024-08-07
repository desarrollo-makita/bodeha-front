import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isActive: boolean = false; // Estado inicial del switch

  constructor(private authService: AuthGuard, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
      
      if(decodedToken.role === 'Consulta'){
        this.router.navigate(['/informes']);
      }
      
    }
  }

  onSwitchChange() {
    console.log('Switch estado:', this.isActive);
  }

}
