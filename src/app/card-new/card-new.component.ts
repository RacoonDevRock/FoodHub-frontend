import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {HeaderCreadorComponent} from "../creador/header-creador/header-creador.component";
import {HeaderExploradorComponent} from "../explorador/header-explorador/header-explorador.component";
import {SideCategoriasComponent} from "../categorias/side-categorias/side-categorias.component";
import {SharedService} from "../services/shared.service";
import {AuthService} from "../services/auth.service";
import {filter} from "rxjs";
import {TitleCasePipe} from "@angular/common";
import {RecetaService} from "../services/receta.service";
import {environment} from "../../environments/environment";
import {RecetaBodyDTO} from "../interfaces/RecetaBodyDTO";

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderCreadorComponent,
    HeaderExploradorComponent,
    SideCategoriasComponent,
    TitleCasePipe
  ],
  templateUrl: './card-new.component.html',
  styleUrl: './card-new.component.css'
})
export class CardNewComponent implements OnInit {
  title = 'categorias';

  public urlImages: string = `${environment.apiUrl}/imagenes/`;
  public recetaDTO!: RecetaBodyDTO;

  public isCreador: boolean = false;
  public header: number = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private sharedService: SharedService,
              private recetaService: RecetaService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // Verificamos la autenticación inicialmente
    this.route.params.subscribe((params) => {
      const recetaId = params['id'];

      this.recetaService.verReceta(recetaId).subscribe(
        (data) => {
          this.recetaDTO = data;
        },
        (error) => {
          console.error('Error al obtener receta:', error);
        }
      );
    });

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

  goBack() {
    window.history.back();
  }

  insertarEspaciosAutomaticos(texto: string): string {
    return texto.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
