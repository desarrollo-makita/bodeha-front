import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableData } from 'app/models/tables.models';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [DatePipe]
})
export class UserEditComponent implements OnInit {
  
  userForm: FormGroup;
  users:any =[];
  fecha:string;
  dataUser : User;
  showTableEdit:boolean = true;
  showFormUpdate:boolean = false;
  successMessage: boolean = false;
  constructor(private userService: UserService, private fb: FormBuilder, ) {this.asignarFecha();}

  ngOnInit() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
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

    const dataReq = {
       usuario: this.dataUser.NombreUsuario,
       email: this.dataUser.Email,
       nombre: this.dataUser.Nombre,
       apellido: this.dataUser.Apellido,
       fechaInicio: this.dataUser.FechaInicio,
       fechaFin: this.dataUser.FechaFin,
       usuarioActivo: this.dataUser.Estado,
       role: this.dataUser.Rol,
       area: this.dataUser.Area
    }
    
    this.userForm.patchValue(dataReq);
    this.showTableEdit = false;
    this.showFormUpdate= true;
  }

  onEditSubmit() {
 
  }
}
