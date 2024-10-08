import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderExploradorComponent } from '../../explorador/header-explorador/header-explorador.component';
import { IniciarSesionComponent } from '../../explorador/iniciar-sesion/iniciar-sesion.component';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderExploradorComponent,
    IniciarSesionComponent,
    RouterLink,
  ],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css',
})
export default class VerifyAccountComponent {
  public messageError: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  verificarCuenta(): void {
    this.route.params.subscribe((params) => {
      const token = params['token'];

      this.authService.confirmation(token).subscribe(
        (response) => {
          console.log('Response', response);
          // Aquí puedes redirigir a una página de éxito o mostrar un mensaje al usuario
        },
        (error) => {
          console.error('Error al confirmar cuenta:', error);
          this.messageError = error.error.message;
          // Aquí puedes redirigir a una página de error o mostrar un mensaje al usuario
        }
      );
    });
  }
}
