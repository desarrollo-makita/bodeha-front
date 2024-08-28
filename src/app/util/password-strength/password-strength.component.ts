import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {
  @Output() passwordValid = new EventEmitter<boolean>();

  password: string = '';
  hasUpperCase: boolean = false;
  hasSpecialCharacter: boolean = false;
  hasMinLength: boolean = false;
  hasNumber: boolean = false;

  passwordStrength: string = '';
  strengthClass: string = '';

  onPasswordInput(password: string) {
    this.password = password;
    this.hasUpperCase = /[A-Z]/.test(this.password);
    this.hasSpecialCharacter = /[\W_]/.test(this.password);  // Carácter especial
    this.hasMinLength = this.password.length >= 8;
    this.hasNumber = /\d/.test(this.password);  // Verifica que contenga un número

    this.calculateStrength();
    this.passwordValid.emit(this.passwordStrength === 'Fuerte');
  }

  calculateStrength() {
    const strengthPoints = [this.hasUpperCase, this.hasSpecialCharacter, this.hasMinLength, this.hasNumber].filter(Boolean).length;

    if (strengthPoints <= 1) {
      this.passwordStrength = 'Clave Débil';
      this.strengthClass = 'weak';
    } else if (strengthPoints === 2 || strengthPoints === 3) {
      this.passwordStrength = 'Clave Media';
      this.strengthClass = 'medium';
    } else {
      this.passwordStrength = 'Clave Fuerte';
      this.strengthClass = 'strong';
    }
  }
}
