import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isActive: boolean = false; // Estado inicial del switch
  userForm: FormGroup;
  successMessage: boolean = false;
  showOtherSelects = true;
  
  constructor(
    private authService: AuthGuard, 
    private router: Router, 
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
      
      if(decodedToken.role === 'Consulta'){
        this.router.navigate(['/informes']);
      }
      
    }

    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      password: ['', Validators.required],
      usuarioActivo: [false, Validators.requiredTrue],
      role: ['', Validators.required],
      area: ['', Validators.required],
      actividad: ['', Validators.required]
    });

    this.userForm.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
    });
  }

  onSwitchChange() {
    console.log('Switch estado:', this.isActive);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      console.log("formData : " , formData);
     
      const userData ={
        nombre : formData.nombre,
        apellido : formData.apellido,
        email : formData.email,
        area : formData.area,
        rol: formData.role,
        estado: formData.usuarioActivo ? "Activo" : "Inactivo",
        fechaInicio : formData.fechaInicio ,
        fechaFin : formData.fechaFin,
        nombreUsuario :formData.usuario,
        clave : formData.password
      }
      
      // Suscribirse al observable devuelto por createUser
      this.userService.createUser(userData).subscribe(
      response => {
        console.log('Usuario creado exitosamente', response);
        
        // Mostrar mensaje de éxito
        this.successMessage = true;
          
          // Limpiar el formulario
          this.userForm.reset();

          // Ocultar el mensaje después de 2 segundos
          setTimeout(() => {
            this.successMessage = false;
          }, 2000);
      },
      error => {
        console.error('Error al crear el usuario', error);
        // Lógica de manejo de errores
      }
    );
    } else {
      // Marca todos los controles como tocados para mostrar errores
      this.userForm.markAllAsTouched();
    }
  }


  onRoleChange(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.showOtherSelects = selectedRole !== 'Consulta';
  }

}
