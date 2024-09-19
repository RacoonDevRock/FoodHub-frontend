import { Component} from '@angular/core';
import {BodyCategoriaComponent} from "../body-categoria/body-categoria.component";

@Component({
  selector: 'app-cena',
  standalone: true,
  imports: [
    BodyCategoriaComponent
  ],
  template: `<app-body-categoria categoria="CENA"></app-body-categoria>`

})
export class CenaComponent {

}
