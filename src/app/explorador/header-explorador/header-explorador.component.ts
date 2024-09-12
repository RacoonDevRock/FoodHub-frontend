import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-explorador',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './header-explorador.component.html',
  styleUrl: './header-explorador.component.css'
})
export class HeaderExploradorComponent {
  public tipo: string = '';

  constructor(private sharedService: SharedService) {}

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
}
