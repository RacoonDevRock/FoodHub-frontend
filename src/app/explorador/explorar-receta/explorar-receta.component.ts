import {Component, OnInit} from '@angular/core';
import {CategoriasComponent} from "../../categorias/categorias.component";
import {HeaderExploradorComponent} from "../header-explorador/header-explorador.component";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-explorar-receta',
  standalone: true,
  imports: [
    CategoriasComponent,
    HeaderExploradorComponent
  ],
  templateUrl: './explorar-receta.component.html',
  styleUrl: './explorar-receta.component.css'
})
export class ExplorarRecetaComponent implements OnInit{

  constructor( private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.setBooleanVariable(false);

  }

}
