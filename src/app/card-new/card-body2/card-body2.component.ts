import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TitleCasePipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {SharedService} from "../../services/shared.service";
import {RecetaService} from "../../services/receta.service";
import {RecetaDTO} from "../../interfaces/RecetaDTO";


@Component({
  selector: 'app-card-body2',
  standalone: true,
    imports: [
        TitleCasePipe
    ],
  templateUrl: './card-body2.component.html',
  styleUrl: './card-body2.component.css'
})
export class CardBody2Component implements OnInit {
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
          console.error(`${error.name}: ${error.message}`);
        }
      );
    });
  }

  goBack() {
    window.history.back();
  }
}
