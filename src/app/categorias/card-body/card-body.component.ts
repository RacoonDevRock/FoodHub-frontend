import { Component, OnInit } from '@angular/core';
import { RecetaDTO } from '../../interfaces/RecetaDTO';
import { RecetaService } from '../../services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { environment } from '../../../environments/environment.development';
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-card-body',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './card-body.component.html',
  styleUrl: './card-body.component.css',
})
export class CardBodyComponent implements OnInit {
  public urlImages: string = `${environment.apiUrl}/imagenes/`;
  public recetaDTO!: RecetaDTO;

  constructor(
    private recetaService: RecetaService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    const idReceta = this.sharedService.getrecetaAlmacenada();
    this.route.params.subscribe((params) => {
      const recetaId = params['id'];

      this.recetaService.verReceta(recetaId).subscribe(
        (receta) => {
          this.recetaDTO = receta;
        },
        (error) => {
          console.error(`Error: ${error.error.message}`);
        }
      );
    });
  }

  goBack() {
    window.history.back();
  }
}
