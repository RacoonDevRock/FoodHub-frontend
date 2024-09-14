import { Component, OnInit } from '@angular/core';
import { RecetaCategoriaDTO } from '../../interfaces/RecetaCategoriaDTO';
import { Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {SideCategoriasComponent} from "../side-categorias/side-categorias.component";

@Component({
  selector: 'app-desayuno',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    SideCategoriasComponent
  ],
  templateUrl: './desayuno.component.html',
  styleUrl: './desayuno.component.css'
})
export class DesayunoComponent implements OnInit {
  public page!: number;
  public recipes: RecetaCategoriaDTO[] = [];

  constructor(
    private router: Router,
    private recetaService: RecetaService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.obtenerRecetasPorCategoria('DESAYUNO');
  }

  obtenerRecetasPorCategoria(categoria: string) {
    this.recetaService.mostrarRecetasPorCategoria(categoria).subscribe(
      (recetas) => {
        this.recipes = recetas;
      },
      (error) => {
        console.error(`${error.name}: ${error.message}`);
      }
    );
  }

  verContenido(recipe: RecetaCategoriaDTO) {
    this.sharedService.setrecetaAlmacenada(recipe.id);
    this.router.navigate(['/cardBody/' + recipe.id]);
    console.log(`idRecipe: ${recipe.id}`);
  }
}
