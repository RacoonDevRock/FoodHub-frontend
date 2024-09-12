import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-side-categorias',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './side-categorias.component.html',
  styleUrl: './side-categorias.component.css'
})
export class SideCategoriasComponent {

}
