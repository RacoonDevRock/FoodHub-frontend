import { Component } from '@angular/core';
import {BodyCategoriaComponent} from "../body-categoria/body-categoria.component";

@Component({
  selector: 'app-deficit',
  standalone: true,
  imports: [
    BodyCategoriaComponent,
  ],
  template: `<app-body-categoria categoria="DEFICIT"></app-body-categoria>`
})
export class DeficitComponent {
}
