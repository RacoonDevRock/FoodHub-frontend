import {Component} from "@angular/core";
import {BodyCategoriaComponent} from "../body-categoria/body-categoria.component";


@Component({
  selector: 'app-postres',
  standalone: true,
  imports: [
    BodyCategoriaComponent
  ],
  template: `<app-body-categoria categoria="POSTRES"></app-body-categoria>`,
})
export class PostresComponent {

}
