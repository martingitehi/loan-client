import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from './authService';

@Injectable()

export class AuthGuard implements CanActivate {
    auth: boolean;

    constructor(private router: Router, private authService: AuthService) {
        this.auth = this.authService.authState;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.auth) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}