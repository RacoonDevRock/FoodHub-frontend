import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-categorias-mv',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './app-side-categorias-mv.component.html',
  styleUrl: './app-side-categorias-mv.component.css'
})
export class AppSideCategoriasMvComponent {

  isDropdownOpenxs: boolean = false;

  toggleDropdownxs(): void {
    this.isDropdownOpenxs = !this.isDropdownOpenxs;
  }
}
