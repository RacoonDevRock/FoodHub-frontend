import { Component, OnInit } from '@angular/core';
import { RecetaCategoriaDTO } from '../../interfaces/RecetaCategoriaDTO';
import { Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {SideCategoriasComponent} from "../side-categorias/side-categorias.component";

@Component({
  selector: 'app-almuerzo',
  standalone: true,
  imports: [
    CommonModule,
    SideCategoriasComponent,
    NgxPaginationModule
  ],
  templateUrl: './almuerzo.component.html',
  styleUrl: './almuerzo.component.css'
})
export class AlmuerzoComponent implements OnInit{
  public page!: number;
  public recipes: RecetaCategoriaDTO[] = [];

  constructor(
    private router: Router,
    private recetaService: RecetaService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.obtenerRecetasPorCategoria('ALMUERZO');
  }

  obtenerRecetasPorCategoria(categoria: string) {
    this.recetaService.mostrarRecetasPorCategoria(categoria).subscribe(
      (receta) => {
        this.recipes = receta;
      },
      (error) => {
        console.error(`${error.name}: ${error.message}`);
      }
    );
  }

  verContenido(recipe: RecetaCategoriaDTO) {
    this.sharedService.setrecetaAlmacenada(recipe.id);
    this.router.navigate(['/cardBody' + recipe.id]);
    console.log(`idRecipe: ${recipe.id}`);
  }
}
