import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderCreadorComponent} from "../creador/header-creador/header-creador.component";
import {HeaderExploradorComponent} from "../explorador/header-explorador/header-explorador.component";
import {SideCategoriasComponent} from "../categorias/side-categorias/side-categorias.component";
import {SharedService} from "../services/shared.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderCreadorComponent,
    HeaderExploradorComponent,
    SideCategoriasComponent
  ],
  templateUrl: './card-new.component.html',
  styleUrl: './card-new.component.css'
})
export class CardNewComponent implements OnInit {
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
