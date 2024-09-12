import { Component } from '@angular/core';
import {SideCategoriasComponent} from "../side-categorias/side-categorias.component";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-inicio-categorias',
  standalone: true,
  imports: [
    SideCategoriasComponent,
    NgxPaginationModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioCategoriasComponent {

}
