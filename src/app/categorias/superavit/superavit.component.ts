import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecetaCategoriaDTO } from '../../interfaces/RecetaCategoriaDTO';
import { Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { SharedService } from '../../services/shared.service';
import { SideCategoriasComponent } from '../side-categorias/side-categorias.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-superavit',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, SideCategoriasComponent],
  templateUrl: './superavit.component.html',
  styleUrl: './superavit.component.css',
})
export class SuperavitComponent implements OnInit {
  public urlImages: string = `${environment.apiUrl}/imagenes/`;

  public page!: number;
  public recipes: RecetaCategoriaDTO[] = [];

  constructor(
    private router: Router,
    private recetaService: RecetaService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.obtenerRecetasPorCategoria('SUPERAVIT');
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
    this.router.navigate(['/categoria/cardBody/' + recipe.id]);
    console.log(`idRecipe: ${recipe.id}`);
  }
}
