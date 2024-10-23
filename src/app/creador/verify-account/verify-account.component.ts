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
  public expired!: boolean;
  public errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.verificarCuenta();
  }

  verificarCuenta(): void {
    this.route.params.subscribe((params) => {
      const token = params['token'];

      this.authService.confirmation(token).subscribe(
        (response) => {
          console.log('Cuenta confirmada', response);
          this.expired = false;
        },
        (error) => {
          console.error('Error al confirmar cuenta:', error.error.message);
          this.expired = true;
          
           if (error.status === 409) {
            this.errorMessage = "Esta cuenta ya ha sido confirmada.";
          } else if (error.status === 404) {
            this.errorMessage = "El tiempo de confirmación ha expirado. Por favor, intente registrarse nuevamente.";
          } else {
            this.errorMessage = "Se ha producido un error al confirmar la cuenta. Por favor, intente nuevamente.";
          }
        }
      );
    });
  }
}
