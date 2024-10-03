import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-password-recovery-dialog',
  templateUrl: './password-recovery-dialog.component.html',
  styleUrls: ['./password-recovery-dialog.component.scss']
})
export class PasswordRecoveryDialogComponent {
  username: string = '';

  constructor(public dialogRef: MatDialogRef<PasswordRecoveryDialogComponent> , private usuarioService : UserService) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log("this.isername" , this.username);
    this.usuarioService.recuperarClave(this.username).subscribe({
      next: response => {
        console.log("Respuestaasas" , response);
        
      },
      error: error => {
    
       
      },
      complete: () => {
      
      }
    });
   
    this.dialogRef.close();
  }
}
