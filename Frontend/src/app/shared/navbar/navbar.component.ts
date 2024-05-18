import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {UserStoreService} from "../../services/store/user-store.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userStoreService: UserStoreService,
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(status => {
      this.isLoggedIn = status;
      this.userStoreService.getCurrentUser().subscribe(user => {
        this.userName = user.firstName + " " + user.lastName;
      })
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log('logout')
        this.router.navigate(['dashboard']).then();
      }
    })
  }
}
