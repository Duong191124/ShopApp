import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  private jwtHelper = new JwtHelperService();
  constructor() { }

  //getter, setter
  setItem(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): number{
    let userObject = this.jwtHelper.decodeToken(this.getToken() ?? '');
    if (userObject && 'userId' in userObject) {
      return parseInt(userObject['userId']);
    }
    return 0;
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean{
    if(this.getToken() == null){
      return false;
    }
    return this.jwtHelper.isTokenExpired(this.getToken()!);
  }

}