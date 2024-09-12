import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-header-creador',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './header-creador.component.html',
  styleUrl: './header-creador.component.css'
})
export class HeaderCreadorComponent implements OnInit{

  public tipo: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.tipo = 'vacio';
    this.sharedService.setTipo(this.tipo);
    console.log('tipo vacio: ', this.tipo);
  }

  llevarCreador() {
    this.tipo = 'creador';
    this.sharedService.setTipo(this.tipo);
    console.log('tipo explorador: ', this.tipo);
  }

}
