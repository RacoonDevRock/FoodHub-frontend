import { Component, OnInit } from '@angular/core';
import { AuthDTO } from '../../interfaces/AuthDTO';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
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
  mensajeErrorIdentificador: string = '';
  mensajeErrorContrasenia: string = '';

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
    localStorage.removeItem('token');

    if (!this.authDTO.identificador) {
      this.errorIdentificador = true;
      this.mensajeErrorIdentificador = 'El campo de correo o código de colegiado es obligatorio.*';
    }else if (this.authDTO.identificador.length!=6 && !this.validarCorreo(this.authDTO.identificador)) {
      this.errorIdentificador = true;
      this.mensajeErrorIdentificador = 'El formato del correo electrónico es incorrecto.*';
    }else if(this.authDTO.identificador.length==6 && !this.validarCodigoColegiatura(this.authDTO.identificador)) {
      this.errorIdentificador = true;
      this.mensajeErrorIdentificador = 'Ingrese un código de colegiatura válido.*';
    }

    if (!this.authDTO.contrasenia) {
      this.errorContrasenia = true;
      this.mensajeErrorContrasenia = 'El campo de contraseña es obligatorio.*';
    }

    this.authService.iniciarSesionCreador(this.authDTO).subscribe(
      (response) => {
        console.log('token', response)
        this.tipo = 'creador';
        this.sharedService.setTipo(this.tipo);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/ingresar']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorRegistro = true;
        if(!this.errorIdentificador&&!this.errorContrasenia){
          this.mensajeError = error.error.message;

        }
      }
    );
  }

  resetErrores(): void {
    this.errorRegistro = false;
    this.errorIdentificador = false;
    this.errorContrasenia = false;
    this.mensajeError = '';
    this.mensajeErrorIdentificador = '';
    this.mensajeErrorContrasenia = '';
  }

  validarCorreo(correo: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  }

  validarCodigoColegiatura(codigo: string): boolean {
    const codigoRegex = /^[0-9]{6}$/;
    return codigoRegex.test(codigo);
  }
}
