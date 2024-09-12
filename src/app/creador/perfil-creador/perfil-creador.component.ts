import { Component, OnInit } from '@angular/core';
import { CreadorDTO } from '../../interfaces/CreadorDTO';
import { CreadorService } from '../../services/creador.service';

@Component({
  selector: 'app-perfil-creador',
  standalone: true,
  imports: [],
  templateUrl: './perfil-creador.component.html',
  styleUrl: './perfil-creador.component.css'
})
export class PerfilCreadorComponent implements OnInit {
  creadorDTO: CreadorDTO = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    contrasenia: '',
    codigoColegiatura: '',
  };

  defaultImage: string = '/default-profile-image.jpg';
  preview: string | ArrayBuffer | null = this.defaultImage;

  constructor(private creadorService: CreadorService) {}

  ngOnInit(): void {
    this.obtenerDatosPerfilCreador();
  }

  obtenerDatosPerfilCreador() {
    this.creadorService.verPerfil().subscribe(
      (response) => {
        this.creadorDTO = response;
      },
      (error) => {
        console.error(`${error.name}: ${error.message}`);
      }
    );
  }
}
