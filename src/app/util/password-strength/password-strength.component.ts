import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordStrengthComponent),
      multi: true
    }
  ]
})
export class PasswordStrengthComponent {
  @Output() passwordValid = new EventEmitter<boolean>();
  passwordControl: FormControl = new FormControl('');

  password: string = '';
  hasUpperCase: boolean = false;
  hasSpecialCharacter: boolean = false;
  hasMinLength: boolean = false;
  hasNumber: boolean = false;

  passwordStrength: string = '';
  strengthClass: string = '';

  private onChange: any = () => {};
  private onTouched: any = () => {};

  showPassword: boolean = false;


  onPasswordInput(password: string) {
    this.password = password;
    this.hasUpperCase = /[A-Z]/.test(this.password);
    this.hasSpecialCharacter = /[\W_]/.test(this.password);  // Carácter especial
    this.hasMinLength = this.password.length >= 8;
    this.hasNumber = /\d/.test(this.password);  // Verifica que contenga un número

    this.calculateStrength();
    this.passwordValid.emit(this.passwordStrength === 'Fuerte');
    this.onChange(this.password); // Notifica al formulario reactivo del cambio
    this.onTouched(); // Marca el control como tocado
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

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this.password = value || '';
    this.onPasswordInput(this.password);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
