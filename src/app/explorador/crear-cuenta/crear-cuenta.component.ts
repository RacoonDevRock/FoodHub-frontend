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

  errorRegistro: boolean = false;
  errorNombre: boolean = false;
  errorCorreo: boolean = false;
  errorCodigoColegiatura: boolean = false;
  errorContrasenia: boolean = false;
  mensajeError: string = '';
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

    // Validación de campos específicos
    if (!this.creadorDTO.nombre || !this.creadorDTO.apellidoPaterno || !this.creadorDTO.apellidoMaterno ||
      !this.creadorDTO.correoElectronico || !this.creadorDTO.contrasenia || !this.creadorDTO.codigoColegiatura) {
      this.errorRegistro = true;
      this.mensajeError = 'Complete todos los campos obligatorios.';
      this.cargando = false;
      return;
    }

    // Validación del correo electrónico
    if (!this.validarCorreo(this.creadorDTO.correoElectronico)) {
      this.errorRegistro = true;
      this.errorCorreo = true;
      this.mensajeError = 'Ingrese un correo electrónico válido.';
      this.cargando = false;
      return;
    }

    // Validación del código de colegiatura
    if (!this.validarCodigoColegiatura(this.creadorDTO.codigoColegiatura)) {
      this.errorRegistro = true;
      this.errorCodigoColegiatura = true;
      this.mensajeError = 'Ingrese un código de colegiatura válido.';
      this.cargando = false;
      return;
    }

    if (this.creadorDTO.contrasenia.length < 8 || !/[A-Z]/.test(this.creadorDTO.contrasenia)) {
      this.errorRegistro = true;
      this.errorContrasenia = true;
      this.mensajeError = 'La contraseña debe tener mínimo 8 caracteres, incluyendo al menos una letra mayúscula.';
      this.cargando = false;
      return;
    }


    this.authService.registrarCreador(this.creadorDTO).subscribe((response) => {

      console.log('Respuesta del servidor:', response);

      const exito = this.validarYCrearCuenta();
      if (exito) {
        this.mostrarModalCuentaCreada = true;
      }
      this.cargando = false;

    }, error => {
      console.error('Error al registrar:', error);
      this.errorRegistro = true;
      this.mensajeError = 'Validación incorrecta. vuelvalo a intentar.';
      this.cargando = false;
    });
  }

  cerrarModalCuentaCreada() {
    this.mostrarModalCuentaCreada = false;
    this.router.navigate(['/iniciarSesion'])

  }

  private validarYCrearCuenta(): boolean {
    return true;
  }

  // Nueva función para reiniciar los errores
  resetErrores(): void {
    this.errorRegistro = false;
    this.errorNombre = false;
    this.errorCorreo = false;
    this.errorCodigoColegiatura = false;
    this.errorContrasenia = false;
    this.mensajeError = '';
  }

  // Nueva función para validar el formato del correo electrónico
  validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(correo);
  }

  // Nueva función para validar el código de colegiatura
  validarCodigoColegiatura(codigo: string): boolean {
    const regex = /^\d{6}$/;
    return regex.test(codigo);
  }
}
