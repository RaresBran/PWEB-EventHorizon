import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {TokenInterceptor} from "./services/services/token.interceptor";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
