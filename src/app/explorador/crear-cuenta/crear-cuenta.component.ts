import { Component } from '@angular/core';
import { CreadorDTO } from '../../interfaces/CreadorDTO';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {
  mostrarModalCuentaCreada: boolean = false;

  // Errores
  errorRegistro: boolean = false;
  errorNombre: boolean = false;
  errorApellidoPaterno: boolean = false;
  errorApellidoMaterno: boolean = false;
  errorCorreo: boolean = false;
  errorContrasenia: boolean = false;
  errorCodigoColegiatura: boolean = false;

  // Mensajes de error individuales
  mensajeError: string = '';
  mensajeErrorNombre: string = '';
  mensajeErrorApellidoPaterno: string = '';
  mensajeErrorApellidoMaterno: string = '';
  mensajeErrorCorreo: string = '';
  mensajeErrorContrasenia: string = '';
  mensajeErrorCodigoColegiatura: string = '';

  cargando: boolean = false;

  creadorDTO: CreadorDTO = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    contrasenia: '',
    codigoColegiatura: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrarCreador(): void {
    this.cargando = true;
    this.resetErrores();

    // Validación de campos
    if (!this.creadorDTO.nombre) {
      this.errorNombre = true;
      this.mensajeErrorNombre = 'El campo de nombres es obligatorio.*';
    }

    if (!this.creadorDTO.apellidoPaterno) {
      this.errorApellidoPaterno = true;
      this.mensajeErrorApellidoPaterno = 'El apellido paterno es obligatorio.*';
    }

    if (!this.creadorDTO.apellidoMaterno) {
      this.errorApellidoMaterno = true;
      this.mensajeErrorApellidoMaterno = 'El apellido materno es obligatorio.*';
    }

    if (!this.creadorDTO.correoElectronico) {
      this.errorCorreo = true;
      this.mensajeErrorCorreo = 'El correo electrónico es obligatorio.*';
    } else if (!this.validarCorreo(this.creadorDTO.correoElectronico)) {
      this.errorCorreo = true;
      this.mensajeErrorCorreo = 'El formato del correo electrónico es incorrecto.*';
    }

    if (!this.creadorDTO.contrasenia) {
      this.errorContrasenia = true;
      this.mensajeErrorContrasenia = 'La contraseña es obligatoria.';
    } else if (this.creadorDTO.contrasenia.length < 8 || !/[A-Z]/.test(this.creadorDTO.contrasenia)) {
      this.errorContrasenia = true;
      this.mensajeErrorContrasenia = 'La contraseña debe tener al menos 8 caracteres y una mayúscula.*';
    }

    if (!this.creadorDTO.codigoColegiatura) {
      this.errorCodigoColegiatura = true;
      this.mensajeErrorCodigoColegiatura = 'El código de colegiatura es obligatorio.*';
    } else if (!this.validarCodigoColegiatura(this.creadorDTO.codigoColegiatura)) {
      this.errorCodigoColegiatura = true;
      this.mensajeErrorCodigoColegiatura = 'Ingrese un código de colegiatura válido.*';
    }


    if (this.errorNombre || this.errorApellidoPaterno || this.errorApellidoMaterno || this.errorCorreo || this.errorContrasenia || this.errorCodigoColegiatura) {
      this.cargando = false;
      return;
    }

    // Llamada al servicio de autenticación
    this.authService.registrarCreador(this.creadorDTO).subscribe((response) => {

      console.log('Respuesta del servidor:', response);

      const exito = this.validarYCrearCuenta();
      if (exito) {
        this.mostrarModalCuentaCreada = true;
      }
      this.cargando = false;

    }, error => {
      console.error('Error al registrar:', error);

      console.error('Error al registrar:', error.message);
      this.errorRegistro = true;
      this.mensajeError = error.error.message;
      this.cargando = false;
    });


  }

  private validarYCrearCuenta(): boolean {
    return true;
  }

  cerrarModalCuentaCreada(): void {
    this.mostrarModalCuentaCreada = false;
    this.router.navigate(['/iniciarSesion']);
    this.resetCampos();

  }

  resetCampos(){
    this.creadorDTO.nombre = "";
    this.creadorDTO.apellidoMaterno = "";
    this.creadorDTO.apellidoPaterno = "";
    this.creadorDTO.correoElectronico = "";
    this.creadorDTO.contrasenia = "";
    this.creadorDTO.codigoColegiatura = "";
  }

  resetErrores(): void {
    this.errorRegistro = false;
    this.errorNombre = false;
    this.errorApellidoPaterno = false;
    this.errorApellidoMaterno = false;
    this.errorCorreo = false;
    this.errorContrasenia = false;
    this.errorCodigoColegiatura = false;

    this.mensajeError = '';
    this.mensajeErrorNombre = '';
    this.mensajeErrorApellidoPaterno = '';
    this.mensajeErrorApellidoMaterno = '';
    this.mensajeErrorCorreo = '';
    this.mensajeErrorContrasenia = '';
    this.mensajeErrorCodigoColegiatura = '';


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
