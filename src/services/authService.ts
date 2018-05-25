import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import { API } from "./api-services";

@Injectable()
export class AuthService {
    public user = this.getAuthenticatedUserProfile();
    public authState = this.getAuthState();

    constructor(private api: API, private router: Router) {
    }

    get CurrentUserId(): string {
        return JSON.parse(localStorage.getItem('buffy_user')).id;
    }

    getAuthState(): boolean {
        if (!isNullOrUndefined(localStorage.getItem('buffy_token')))
            return true;
        else
            return false;
    }

    getAuthenticatedUserProfile(): any {
        let user = !isNullOrUndefined(localStorage.getItem('buffy_user'));
        return user ? JSON.parse(localStorage.getItem('buffy_user')) : null;
    }

    login(user: any): Promise<boolean> {
        return new Promise(resolve => {
            this.api.login(user).then((res: any) => {
                if (res.success == true) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }).catch(err => console.error(err.message));
        });
    }

    logout() {
        localStorage.removeItem('buffy_token');
        localStorage.removeItem('buffy_user');
        this.router.navigateByUrl('/login');
    }
}
