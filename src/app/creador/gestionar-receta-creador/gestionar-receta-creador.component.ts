import { Component, OnInit } from '@angular/core';
import { CreadorService } from '../../services/creador.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-gestionar-receta-creador',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './gestionar-receta-creador.component.html',
  styleUrl: './gestionar-receta-creador.component.css'
})
export class GestionarRecetaCreadorComponent implements OnInit {
  cantidadRecetas = 0;

  constructor(private creadorService: CreadorService) {}

  ngOnInit(): void {
    this.obtenerCantidadRecetas();
  }

  obtenerCantidadRecetas() {
    this.creadorService.obtenerCantidadRecetasCreadas().subscribe(
      (response) => {
        this.cantidadRecetas = response;
        console.log(`Cantidad de recetas: ${this.cantidadRecetas} recetas`);
      },
      (error) => {
        console.error(`${error.name}: ${error.message}`);
      }
    );
  }
}
