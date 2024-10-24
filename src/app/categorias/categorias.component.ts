import {Component, OnInit} from '@angular/core';
import {HeaderExploradorComponent} from "../explorador/header-explorador/header-explorador.component";
import {HeaderCreadorComponent} from "../creador/header-creador/header-creador.component";
import { SharedService } from '../services/shared.service';
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {SideCategoriasComponent} from "./side-categorias/side-categorias.component";
import {NgClass} from "@angular/common";
import {AppSideCategoriasMvComponent} from "./side-categorias-mv/app-side-categorias-mv.component";
import {AuthService} from "../services/auth.service";
import {filter} from "rxjs";

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

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) {}

  ngOnInit() {
    // Verificamos la autenticación inicialmente


    console.log("HOLAAAAAA"+ this.sharedService.getBooleanVariable())


    this.verificarAutenticacion();

    // Suscribimos al evento de navegación para detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtramos solo los eventos de navegación
    ).subscribe(() => {
      // Cada vez que cambie la ruta, volvemos a verificar la autenticación
      this.verificarAutenticacion();
    });
  }

  // Método para verificar autenticación
  verificarAutenticacion() {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.header = 1; // Usuario autenticado, mostrar header 1
        console.log('Usuario autenticado, mostrando header 1');
      } else {
        this.header = 2; // Usuario no autenticado, mostrar header 2
        console.log('Usuario no autenticado, mostrando header 2');
        console.log("HOLAAAAAA Nunca entre")

      }
    }, error => {
      // Manejar errores
      console.error('Error al verificar autenticación', error);

      this.header = 2; // Si hay un error, asume que no está autenticado

      if(localStorage.getItem('sesion') === 'true'){
        this.sharedService.activarModalSesionExpirada(true); // Activar el modal de sesión expirada
        this.router.navigate(['/iniciarSesion']); // Redirigir al login
        console.log("HOLAAAAAA"+ this.sharedService.getBooleanVariable())
      } else {
        console.log("HOLAAAAAA ya me sali")

      }


    });
  }

}
