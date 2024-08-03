import { inject, Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'  
})
export class AuthGuard {
    constructor(private tokenService: TokenService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId();
        debugger
        if(!isTokenExpired && isUserIdValid){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AuthGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger;
    return inject(AuthGuard).canActivate(next, state);
}