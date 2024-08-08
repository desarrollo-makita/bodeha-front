import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyDataService } from 'app/services/data/my-data.service';
import { LoginService } from 'app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  showMessage : boolean= false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder , private router: Router , private loginService: LoginService, private dataService: MyDataService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],

    });
  }

  onSubmit() {
    localStorage.removeItem('authToken');
    
    if (this.loginForm.valid) {
      const { usuario, clave } = this.loginForm.value;
     
      this.isLoading = true; // Mostrar el loader
      this.loginService.login(usuario, clave).subscribe({
        next: response => {
          // Guarda el token en el localStorage
          localStorage.setItem('authToken', response.data.token);
          
          console.log('Login successful', response);
          
          this.dataService.setArrayData(response.data.menu);
          
          if(response.data.Rol === 'Consulta'){
            this.router.navigate(['/informes']);
          }else if(response.data.Rol === 'Administrador'){
            this.router.navigate(['/user']);
          }
          
        },
        error: error => {
      
          console.error('Login failed', error);
          this.errorMessage = 'Login fallido. Verifique sus credenciales.'; // Actualizar el mensaje de error
          this.showMessage = true;
          this.isLoading = false; // Ocultar el loader
        },
        complete: () => {
          this.isLoading = false; // Ocultar el loader
        }
      });
    } else {
      console.log('Form not valid');
    }
  }

  clearUsuario() {
    if(this.showMessage){
      this.errorMessage = '';
      this.loginForm.reset();
      this.showMessage = false;
    }
  }

 
}
