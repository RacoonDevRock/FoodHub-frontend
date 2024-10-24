import { Component } from '@angular/core';
import {BodyCategoriaComponent} from "../body-categoria/body-categoria.component";


@Component({
  selector: 'app-almuerzo',
  standalone: true,
  imports: [
    BodyCategoriaComponent,
  ],
    template: `<app-body-categoria categoria="ALMUERZO"></app-body-categoria>`
})
export class AlmuerzoComponent {

}
