import { Component, OnInit } from '@angular/core';
import { CreadorDTO } from '../../interfaces/CreadorDTO';
import { CreadorService } from '../../services/creador.service';
import { environment } from '../../../environments/environment.development';
import { CreadorProfileDTO } from '../../interfaces/CreadorProfileDTO';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-perfil-creador',
  standalone: true,
  imports: [],
  templateUrl: './perfil-creador.component.html',
  styleUrl: './perfil-creador.component.css',
})
export class PerfilCreadorComponent implements OnInit {
  public creadorDTO: CreadorProfileDTO = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    codigoColegiatura: '',
    fotoPerfil: '',
  };

  defaultImage: string = '/default-profile-image.jpg';
  preview: string | ArrayBuffer | null = this.defaultImage;
  selectedFile: File | null = null;
  imagen: string = '';
  errorRegistro: boolean = false;

  mostrarModalNoDatosPerfil: boolean = false;

  public urlImages: string = `${environment.apiUrl}/imagenes/`;

  constructor(private creadorService: CreadorService,   private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerDatosPerfilCreador();

  }

  obtenerDatosPerfilCreador() {
    this.creadorService.verPerfil().subscribe(
      (response) => {
        this.creadorDTO = response;

        // Si algunos campos importantes están vacíos, mostramos el modal
        if (!this.creadorDTO.nombre || !this.creadorDTO.apellidoPaterno || !this.creadorDTO.correoElectronico) {
          this.mostrarModalNoDatosPerfil = true;
        }
      },
      (error) => {
        // En caso de error, mostramos el modal
        this.mostrarModalNoDatosPerfil = true;
        console.error('Error al obtener los datos del perfil:', error);
      }
    );
  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.convertToBase64();
  }

  convertToBase64() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imagen = reader.result as string;
        this.subirFotoPerfil();
      };
      reader.onerror = (error) => {
        console.log(`Error: ${error}`);
      };
    }
  }

  subirFotoPerfil() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('fotoPerfil', this.selectedFile);

      this.creadorService.actualizarFotoPerfil(formData).subscribe(
        () => {
          alert('Foto de perfil actualizada exitosamente');
        },
        (error) => {
          console.error('Error al subir la foto de perfil:', error);
        }
      );
    }
  }


  cerrarModalSesionExpirada(): void {
    this.mostrarModalNoDatosPerfil = false;
    this.router.navigate(['/iniciarSesion']);

  }
}
