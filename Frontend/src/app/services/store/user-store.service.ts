import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {UserDto} from "../../models/user-dto";
import {AuthenticationService} from "../services/authentication.service";
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  public user$: Observable<UserDto | null> = this.userSubject.asObservable();

  constructor(private authService: AuthenticationService, private tokenService: TokenService) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.authService.isAuthenticated().subscribe(status => {
      if (status) {
        this.authService.getCurrentUser().pipe(
          tap(user => this.userSubject.next(user))
        ).subscribe();
      } else {
        this.userSubject.next(null);
      }
    })
  }

  getCurrentUser(): Observable<UserDto | null> {
    return this.user$;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    return (user ?? false) && this.tokenService.getUserRoles().includes('ROLE_ADMIN');
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.getValue();
  }
}
