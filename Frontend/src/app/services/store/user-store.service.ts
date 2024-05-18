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
  private userSubject = new BehaviorSubject<UserDto>({} as UserDto);
  public user$: Observable<UserDto> = this.userSubject.asObservable();

  constructor(private authService: AuthenticationService, private tokenService: TokenService) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.authService.getCurrentUser().pipe(
      tap(user => this.userSubject.next(user))
    ).subscribe();
  }

  getCurrentUser(): Observable<UserDto> {
    return this.user$;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    return user && this.tokenService.getUserRoles().includes('ROLE_ADMIN');
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.getValue();
  }
}
