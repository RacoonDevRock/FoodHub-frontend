import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-header-explorador',
  standalone: true,
  templateUrl: './header-explorador.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  styleUrls: ['./header-explorador.component.css']
})
export class HeaderExploradorComponent implements OnInit {
  public tipo: string = '';

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.tipo = 'vacio';
    this.sharedService.setTipo(this.tipo);
    console.log('tipo vacio: ', this.tipo);
  }

  llevarExplorador() {
    this.tipo = 'explorador';
    this.sharedService.setTipo(this.tipo);
    console.log('tipo explorador: ', this.tipo);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
