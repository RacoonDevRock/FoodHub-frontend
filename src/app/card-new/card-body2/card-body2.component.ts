import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { RecetaService } from '../../services/receta.service';
import { RecetaBodyDTO } from '../../interfaces/RecetaBodyDTO';

@Component({
  selector: 'app-card-body2',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './card-body2.component.html',
  styleUrl: './card-body2.component.css',
})
export class CardBody2Component implements OnInit {
  public urlImages: string = `${environment.apiUrl}/imagenes/`;
  public recetaDTO!: RecetaBodyDTO;

  constructor(
    private recetaService: RecetaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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


  }

  goBack() {
    window.history.back();
  }

  insertarEspaciosAutomaticos(texto: string): string {
    return texto.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
