import {Component, OnInit} from '@angular/core';
import {HeaderExploradorComponent} from "../explorador/header-explorador/header-explorador.component";
import {HeaderCreadorComponent} from "../creador/header-creador/header-creador.component";
import { SharedService } from '../services/shared.service';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    HeaderExploradorComponent,
    HeaderCreadorComponent,
    RouterOutlet
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  title = 'categorias';

  public tipo: string = '';
  public header: number = 0;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.tipo = this.sharedService.getTipo();
    console.log('tipo de muestra: ', this.tipo);
    if (this.tipo === 'creador') {
      this.header = 2;
    } else {
      this.header = 1;
    }
  }
}