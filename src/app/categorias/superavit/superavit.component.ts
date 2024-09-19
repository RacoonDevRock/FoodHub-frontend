import { Component  } from '@angular/core';
import { SideCategoriasComponent } from '../side-categorias/side-categorias.component';
import {BodyCategoriaComponent} from "../body-categoria/body-categoria.component";


@Component({
  selector: 'app-superavit',
  standalone: true,
  imports: [
    BodyCategoriaComponent
  ],
  template: `<app-body-categoria categoria="SUPERAVIT"></app-body-categoria>`
})
export class SuperavitComponent {

}
