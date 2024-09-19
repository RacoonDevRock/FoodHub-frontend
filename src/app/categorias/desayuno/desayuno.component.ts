import { Component } from '@angular/core';
import {BodyCategoriaComponent} from "../body-categoria/body-categoria.component";

@Component({
  selector: 'app-desayuno',
  standalone: true,
  imports: [
    BodyCategoriaComponent,
  ],
  template: `<app-body-categoria categoria="DESAYUNO"></app-body-categoria>`
})
export class DesayunoComponent {

}
