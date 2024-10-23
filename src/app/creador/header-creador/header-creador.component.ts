import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {NgClass} from "@angular/common";
import {CreadorProfileDTO} from "../../interfaces/CreadorProfileDTO";
import {environment} from "../../../environments/environment.development";
import {CreadorService} from "../../services/creador.service";

@Component({
  selector: 'app-header-creador',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './header-creador.component.html',
  styleUrl: './header-creador.component.css'
})
export class HeaderCreadorComponent implements OnInit{

  public creadorDTO: CreadorProfileDTO = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    codigoColegiatura: '',
    fotoPerfil: '',
  };
  public urlImages: string = `${environment.apiUrl}/imagenes/`;



  public tipo: string = '';

  constructor(private sharedService: SharedService, private router: Router, private creadorService: CreadorService) {}

  ngOnInit() {

    this.obtenerDatosPerfilCreador();

  }

  obtenerDatosPerfilCreador() {
    this.creadorService.verPerfil().subscribe((response) => {
      this.creadorDTO = response;
    });
  }


  isActive(route: string): boolean {
    return this.router.url === route;
  }
  isActiveCategoria(): boolean {
    const url = this.router.url;
    return url === '/categoria' || url.startsWith('/categoria/');
  }


}
