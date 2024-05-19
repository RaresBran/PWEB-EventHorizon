import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'authToken';

  isTokenValid(token: string | null) {
    if (!token) {
      this.clearToken()
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      this.clearToken()
      return false;
    }
    return true;
  }

  getUserRoles(): string[] {
    if (this.getToken()) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(this.getToken() ?? '');
      return decodedToken.authorities;
    }
    return [];
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    if (this.isTokenValid(localStorage.getItem(this.TOKEN_KEY)))
      return localStorage.getItem(this.TOKEN_KEY);
    return null;
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
