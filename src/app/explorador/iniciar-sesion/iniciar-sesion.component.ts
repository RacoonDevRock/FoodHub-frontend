import { Component, OnInit } from '@angular/core';
import {AuthDTO} from "../../interfaces/AuthDTO";
import {Router, RouterLink} from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {
  public tipo: string = '';
  public authDTO: AuthDTO = {
    identificador: '',
    contrasenia: '',
  };

  errorRegistro: boolean = false;
  errorIdentificador: boolean = false;
  errorContrasenia: boolean = false;
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.tipo = 'vacio';
    this.sharedService.setTipo(this.tipo);
  }

  iniciarSesion(): void {
    this.resetErrores();

    if (!this.authDTO.identificador || !this.authDTO.contrasenia) {
      this.errorRegistro = true;
      this.mensajeError = 'Complete todos los campos obligatorios.';
      return;
    }

    this.authService.iniciarSesionCreador(this.authDTO).subscribe(
      (response) => {
        this.tipo = 'creador';
        this.sharedService.setTipo(this.tipo);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/ingresar']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorRegistro = true;
        this.mensajeError = 'Error al iniciar sesión. Inténtalo de nuevo';
      }
    );
  }

  resetErrores(): void {
    this.errorRegistro = false;
    this.errorIdentificador = false;
    this.errorContrasenia = false;
    this.mensajeError = '';
  }
}
