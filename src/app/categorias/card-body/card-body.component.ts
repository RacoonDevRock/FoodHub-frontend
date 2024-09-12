import { Component, OnInit } from '@angular/core';
import { RecetaDTO } from '../../interfaces/RecetaDTO';
import { RecetaService } from '../../services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-card-body',
  standalone: true,
  imports: [],
  templateUrl: './card-body.component.html',
  styleUrl: './card-body.component.css'
})
export class CardBodyComponent implements OnInit{
  public recetaDTO!: RecetaDTO;

  constructor(
    private recetaService: RecetaService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    const idReceta = this.sharedService.getrecetaAlmacenada();
    this.recetaService.verReceta(idReceta).subscribe(
      (receta) => {
        this.recetaDTO = receta;
      },
      (error) => {
        console.error(`${error.name}: ${error.message}`);
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
