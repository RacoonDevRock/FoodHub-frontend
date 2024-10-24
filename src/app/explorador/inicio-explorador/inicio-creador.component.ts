import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-inicio-categorias-explorador',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './inicio-creador.component.html',
  styleUrl: './inicio-creador.component.css'
})
export class InicioCreadorComponent implements OnInit{

  constructor( private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.setBooleanVariable(false);

  }


}
