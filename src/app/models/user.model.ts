// src/app/models/user.model.ts

export interface User {
    Apellido: string;
    Area: string;
    Email: string;
    Estado: string;
    FechaFin: string;
    FechaInicio: string;
    Nombre: string;
    NombreUsuario: string;
    Rol: string;
    UsuarioID: number;
    actividad: Actividad[];
  }

  interface Actividad {
    nombreActividad: string;
    codigoActividad: number; // Asegúrate de que este tipo coincida con tus datos
  }
  