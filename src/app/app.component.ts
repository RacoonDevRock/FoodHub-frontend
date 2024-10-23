import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular18.2_FoodHub';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Escuchar el evento de almacenamiento para detectar la eliminación del token
    window.addEventListener('storage', (event) => {
      if (event.key === 'isLoggedIn' && event.newValue === 'false') {
        // Si la sesión ha sido cerrada o el token ha sido eliminado
        this.authService.handleSessionExpiration();
      }
    });
  }
}
