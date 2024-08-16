import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [DatePipe]
})
export class UserEditComponent implements OnInit {
  idUser: any;
  userFormEdit: FormGroup;
  users:any =[];
  fecha:string;
  dataUser : User;
  showTableEdit:boolean = true;
  showFormUpdate:boolean = false;
  successMessage: boolean = false;
  errorMessage: boolean = false;
  constructor(private userService: UserService, private fb: FormBuilder,private router: Router ,  ) {this.asignarFecha();}

  ngOnInit() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
        console.log("response : " , response , this.users);
      },
      error: (error) => {
        console.error('Error al obtener a los usuarios', error);
          // Lógica de manejo de errores
      },
      complete: () => {
          console.log('Obtener usuarios completada');
          // Lógica adicional que desees ejecutar cuando la operación se complete
      }
    });

    this.userFormEdit = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      usuarioActivo: [''],
      role: ['', Validators.required],
      area: ['', Validators.required],
      actividad: ['', Validators.required]
    });
  }

  asignarFecha() {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const fechaActual = new Date();
    const diaSemana = diasSemana[fechaActual.getDay()];
    const dia = fechaActual.getDate();
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();

    this.fecha = `${diaSemana} ${dia} de ${mes} del ${año}`;
  }

  editUser(data){
    this.dataUser = data;
    console.log('datauser: ' , this.dataUser);

    this.idUser = this.dataUser.UsuarioID;
    const dataReq = {
       usuario: this.dataUser.NombreUsuario,
       email: this.dataUser.Email,
       nombre: this.dataUser.Nombre,
       apellido: this.dataUser.Apellido,
       fechaInicio: this.dataUser.FechaInicio,
       fechaFin: this.dataUser.FechaFin,
       usuarioActivo: this.dataUser.Estado,
       role: this.dataUser.Rol,
       area: this.dataUser.Area,
       actividad: this.dataUser.Actividad
    }
    
    this.userFormEdit.patchValue(dataReq);
    this.showTableEdit = false;
    this.showFormUpdate= true;
  }

  onEditSubmit() {
    let formData = this.userFormEdit.value;
    formData.IdUsario = this.idUser;
    this.userService.updateUser(formData).subscribe({
      next: (response) => {
        console.log("response:", response);

        if(response.status != 200){
          this.errorMessage =true;
          // Limpiar el formulario
          this.userFormEdit.reset();
          
        }else{
          // Mostrar mensaje de éxito
          this.successMessage = true;
          
          // Limpiar el formulario
          this.userFormEdit.reset();
        }

        setTimeout(() => {
          this.successMessage = false;
          this.errorMessage = false;
          this.showTableEdit = true;
          this.showFormUpdate = false
          // Opcional: Recargar la tabla con los datos actualizados
          this.loadUsers();
          
        }, 2000);

      },
      error: (error) => {
        console.error('Error al editar el usuario', error);
          // Lógica de manejo de errores
      },
      complete: () => {
          console.log('Edicion de usuario completada');
          // Lógica adicional que desees ejecutar cuando la operación se complete
      }
    });
  }

  loadUsers(){
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
        console.log("response22 : " , response , this.users);
      },
      error: (error) => {
        console.error('Error al obtener a los usuarios', error);
          // Lógica de manejo de errores
      },
      complete: () => {
          console.log('Obtener usuarios completada');
          // Lógica adicional que desees ejecutar cuando la operación se complete
      }
    });
  }
}
