import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-replace-temporary-key',
  templateUrl: './replace-temporary-key.component.html',
  styleUrls: ['./replace-temporary-key.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReplaceTemporaryKeyComponent implements OnInit {
  claveTemporal: string;
  passwordTemporal: string;
  showCheckVerify: boolean = false;
  nuevaClave: string;
  hasUpperCase: boolean = false;
  hasSpecialCharacter: boolean = false;
  hasMinLength: boolean = false;
  hasNumber: boolean = false;
  showInfoClave: boolean = false;
  showVeryfiPassword: boolean = false

  constructor(public dialogRef: MatDialogRef<ReplaceTemporaryKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.claveTemporal = data.claveTemporal;
      console.log('Clave temporal recibida:', this.claveTemporal);
    }

  ngOnInit(): void {
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.passwordTemporal = inputElement.value;
    if(this.passwordTemporal  === this.claveTemporal  ){
      this.showCheckVerify =  true;
    }else{
      this.showCheckVerify = false;
    }
  }

  onPasswordInput(password: string) {
    this.nuevaClave = password;
    this.hasUpperCase = /[A-Z]/.test(this.nuevaClave);
    this.hasSpecialCharacter = /[\W_]/.test(this.nuevaClave); // Carácter especial
    this.hasMinLength = this.nuevaClave.length >= 8;
    this.hasNumber = /\d/.test(this.nuevaClave); // Verifica que contenga un número

    if (
      this.hasUpperCase &&
      this.hasSpecialCharacter &&
      this.hasMinLength &&
      this.hasNumber
    ) {
      this.showInfoClave = true; // Establece el valor si la contraseña es válida
    } else {
      this.showInfoClave = false;
    }

  }

  confirmarCLave(repeatClave : string){

    if(this.nuevaClave === repeatClave){
      this.showVeryfiPassword= true;
    }else{
      this.showVeryfiPassword= false;
    }
  }


  enviaCambioClave(){
    console.log("entroooooooo");
  }


}
