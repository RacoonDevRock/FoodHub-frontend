import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-header-creador',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './header-creador.component.html',
  styleUrl: './header-creador.component.css'
})
export class HeaderCreadorComponent implements OnInit{

  public tipo: string = '';

  constructor(private sharedService: SharedService, private router: Router) {}

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
  isActive(route: string): boolean {
    return this.router.url === route;
  }


}
