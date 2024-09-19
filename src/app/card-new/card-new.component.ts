import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderCreadorComponent} from "../creador/header-creador/header-creador.component";
import {HeaderExploradorComponent} from "../explorador/header-explorador/header-explorador.component";
import {SideCategoriasComponent} from "../categorias/side-categorias/side-categorias.component";
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderCreadorComponent,
    HeaderExploradorComponent,
    SideCategoriasComponent
  ],
  templateUrl: './card-new.component.html',
  styleUrl: './card-new.component.css'
})
export class CardNewComponent implements OnInit {
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
