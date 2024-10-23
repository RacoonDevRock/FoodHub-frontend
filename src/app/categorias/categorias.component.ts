import {Component, OnInit} from '@angular/core';
import {HeaderExploradorComponent} from "../explorador/header-explorador/header-explorador.component";
import {HeaderCreadorComponent} from "../creador/header-creador/header-creador.component";
import { SharedService } from '../services/shared.service';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {SideCategoriasComponent} from "./side-categorias/side-categorias.component";
import {NgClass} from "@angular/common";
import {AppSideCategoriasMvComponent} from "./side-categorias-mv/app-side-categorias-mv.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    HeaderExploradorComponent,
    HeaderCreadorComponent,
    RouterOutlet,
    FooterComponent,
    SideCategoriasComponent,
    NgClass,
    AppSideCategoriasMvComponent
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  title = 'categorias';

  public isCreador: boolean = false;
  public header: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        // Si el usuario está autenticado, muestra el header 1
        this.header = 1;
        console.log('Usuario autenticado, mostrando header 1');
      } else {
        // Si el usuario no está autenticado, muestra el header 2
        this.header = 2;
        console.log('Usuario no autenticado, mostrando header 2');
      }
    }, error => {
      // Maneja errores de la solicitud al backend
      console.error('Error al verificar autenticación', error);
      this.header = 2; // Si hay error, asume que no está autenticado
    });
  }
}
