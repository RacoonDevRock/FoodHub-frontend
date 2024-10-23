import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-header-explorador',
  standalone: true,
  templateUrl: './header-explorador.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  styleUrls: ['./header-explorador.component.css']
})
export class HeaderExploradorComponent implements OnInit {
  public isCreador: boolean = false;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {

  }


  isActive(route: string): boolean {
    return this.router.url === route;
  }
  isActiveCategoria(): boolean {
    const url = this.router.url;
    return url === '/categoria' || url.startsWith('/categoria/');
  }
}
