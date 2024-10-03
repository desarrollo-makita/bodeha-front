import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AreaMantenedorComponent } from './area-mantenedor/area-mantenedor.component';

// Nuevas importaciones para Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';  // Agregado para mat-form-field
import { MatInputModule } from '@angular/material/input';  // Agregado para matInput

import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { PasswordStrengthComponent } from './util/password-strength/password-strength.component';
import { PasswordRecoveryDialogComponent } from './shared/password-recovery-dialog/password-recovery-dialog.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MatDialogModule,     // Para diálogos
    MatButtonModule,     // Para botones
    MatSlideToggleModule, // Para switches
    MatIconModule,       // Para íconos
    MatFormFieldModule,  // Para usar mat-form-field
    MatInputModule,      // Para usar matInput
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UserComponent,
    UserEditComponent,
    AreaMantenedorComponent,
    ConfirmDialogComponent,
    PasswordStrengthComponent,
    PasswordRecoveryDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
