import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'authToken';
  private token: string | null;

  constructor() {
    this.token = this.getToken();
  }

  isTokenValid(token: string | null) {
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  getUserRoles(): string[] {
    if (this.token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(this.token ?? '');
      return decodedToken.authorities;
    }
    return [];
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}
