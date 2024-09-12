import { Component } from '@angular/core';
import {HeaderCreadorComponent} from "./header-creador/header-creador.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-creador',
  standalone: true,
  imports: [
    HeaderCreadorComponent,
    RouterOutlet
  ],
  templateUrl: './creador.component.html',
  styleUrl: './creador.component.css'
})
export class CreadorComponent {

}
