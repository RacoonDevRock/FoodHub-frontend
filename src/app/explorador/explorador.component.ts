import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderExploradorComponent} from "./header-explorador/header-explorador.component";

@Component({
  selector: 'app-explorador',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderExploradorComponent
  ],
  templateUrl: './explorador.component.html',
  styleUrl: './explorador.component.css'
})
export class ExploradorComponent {

}
