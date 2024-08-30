import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { User } from 'app/models/user.model';
import { MyDataService } from 'app/services/data/my-data.service';
import { UserService } from 'app/services/user/user.service';
import { format } from 'path';

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

  nombre: any;
  fechaVigencia :any;
  rol: any;
  apellido:any;
  public vigencia: string = '';
  errorMessage: boolean = false;
  warningMessage: boolean = false;
  emailRespuesta:any;
  fechaFin:any;
  isLoading: boolean = false;
  isPasswordValid: boolean = false;
  constructor(
    private authService: AuthGuard, 
    private router: Router, 
    private fb: FormBuilder,
    private userService: UserService,
    private myDataService: MyDataService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    if(token) {
      const decodedToken = this.authService.decodeToken(token);
      
      this.nombre  = decodedToken.username;
      this.apellido = decodedToken.apellido;
      this.rol = decodedToken.role;
      this.vigencia = this.calcularVigencia(decodedToken.fechaInicio, decodedToken.fechaFin);

      if(decodedToken.role === 'Consulta'){
        this.router.navigate(['/informes']);
      }
      
    }

    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      password: ['', Validators.required],
      usuarioActivo: [false, Validators.requiredTrue],
      role: ['', Validators.required],
      area: ['', Validators.required],
      actividad: ['', Validators.required]
    });

    this.userForm.get('nombre').valueChanges.subscribe(() => {
      this.setUsuario();
    });
    
    this.userForm.get('apellidoPaterno').valueChanges.subscribe(() => {
      this.setUsuario();
    });
  
    this.userForm.get('apellidoMaterno').valueChanges.subscribe(() => {
      this.setUsuario();
    });

    // Setear la fecha actual al cargar el componente
    const today = new Date().toISOString().substring(0, 10); // Formato 'YYYY-MM-DD'

    this.userForm.get('fechaInicio')?.setValue(today);
  
    
    const currentDate = new Date(); // Fecha actual
    currentDate.setDate(currentDate.getDate() + 90); // Añade 90 días

    // Convertir la fecha a formato 'YYYY-MM-DD'
    const futureDate = currentDate.toISOString().substring(0, 10);
    this.fechaFin = futureDate;
  }

  setUsuario(): void {
    const nombre = this.userForm.get('nombre').value;
    const apellidoPaterno = this.userForm.get('apellidoPaterno').value;
    const apellidoMaterno = this.userForm.get('apellidoMaterno').value;
  
    if (nombre && apellidoPaterno) {
      // Extraer la primera letra del nombre y el primer apellido
      const primeraLetraNombre = nombre.trim().charAt(0).toLowerCase();
      const primerApellido = apellidoPaterno.trim().split(' ')[0].toLowerCase();
      let usuario = `${primeraLetraNombre}${primerApellido}`;
  
      // Llamar al servicio para verificar si el username existe
      this.userService.usernameExists(usuario).subscribe(exists => {
      
        if (exists && apellidoMaterno) {
          // Si ya existe y hay un segundo apellido, agregar la primera letra del apellido materno
          const primeraLetraMaterno = apellidoMaterno.trim().charAt(0).toLowerCase();
          usuario += primeraLetraMaterno;
        }
        // Establecer el valor del campo usuario
        this.userForm.get('usuario').setValue(usuario);
      });
    }
  }


  onSubmit() {
    this.isLoading = true;
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      const userData ={
        nombre : formData.nombre,
        apellido: formData.apellidoPaterno + ' ' + formData.apellidoMaterno,
        email : formData.email,
        area : formData.area,
        rol: formData.role,
        estado: formData.usuarioActivo ? "true" : "false",
        fechaInicio : formData.fechaInicio ,
        fechaFin : this.fechaFin,
        nombreUsuario :formData.usuario,
        clave : formData.password,
        actividad: formData.actividad
      }
      
      // Suscribirse al observable devuelto por createUser
      this.userService.createUser(userData).subscribe({
        next: (response) => {
         
          if(response.status != 200){
            this.errorMessage =true;
            // Limpiar el formulario
            this.userForm.reset();
          }else if(response.status === 200 && response.resul.output.Mensaje === 'Usuario ya ingresado'){
            this.warningMessage = true;
            this.emailRespuesta = response.resul.data.email;
          }else if(response.status === 200 && response.resul.output.Mensaje === 'Success' ){
            
            // Mostrar mensaje de éxito
            this.successMessage = true;
            
            // Limpiar el formulario
            this.userForm.reset();
          }
          

          // Ocultar el mensaje después de 2 segundos
          setTimeout(() => {
            this.successMessage = false;
            this.errorMessage =false;
            this.warningMessage = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error al crear el usuario', error);
          
        },
        complete: () => {
            console.log('Creación de usuario completada');
            this.isLoading = false;
        }
      });

    }else{
      // Marca todos los controles como tocados para mostrar errores
      this.userForm.markAllAsTouched();
    }
  }


  onRoleChange(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.showOtherSelects = selectedRole !== 'Consulta';
  }

  calcularVigencia(fechaInicio: string, fechaFin: string): string {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Calcular la diferencia en milisegundos
    const diferenciaMs = fin.getTime() - inicio.getTime();

    // Convertir a días (1000 ms * 60 seg * 60 min * 24 horas)
    const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

    return `Vigencia hasta el ${fin.toLocaleDateString()} (${diferenciaDias} días)`;
  }

}
