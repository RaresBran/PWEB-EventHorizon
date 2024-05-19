import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {ApiConfiguration} from "../api-configuration";
import {AuthenticationRequest} from "../../models/authentication-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {RegisterRequest} from "../../models/register-request";
import {TokenService} from "./token.service";
import {UserDto} from "../../models/user-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  private baseUrl: string = `${this.apiConfiguration.rootUrl}/app/auth`;
  private authState = new BehaviorSubject<boolean>(this.tokenService.hasToken());

  constructor(
    private http: HttpClient,
    private apiConfiguration: ApiConfiguration,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    if (this.tokenService.hasToken() && this.tokenService.isTokenValid(this.tokenService.getToken())) {
      this.authState.next(true);
    }
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  logout(): Observable<void> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, { headers })
      .pipe(
        tap(() => {
          this.tokenService.clearToken()
          this.authState.next(false);
        })
      );
  }

  getCurrentUser(): Observable<UserDto> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserDto>(`${this.apiConfiguration.rootUrl}/app/user`, { headers });
  }

  private handleAuthResponse(response: AuthenticationResponse): void {
    if (this.tokenService.isTokenValid(response.token ?? null)) {
      this.tokenService.setToken(response.token ?? '');
      this.authState.next(true);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
