import { Component, OnInit } from '@angular/core';
import { RecetaDTO } from '../../interfaces/RecetaDTO';
import { RecetaService } from '../../services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-card-body',
  standalone: true,
  imports: [],
  templateUrl: './card-body.component.html',
  styleUrl: './card-body.component.css',
})
export class CardBodyComponent implements OnInit {
  public urlImages: string = `${environment.apiUrl}/imagen_recetas/`;
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
          console.error(`${error.name}: ${error.message}`);
        }
      );
    });
  }

  goBack() {
    window.history.back();
  }
}
