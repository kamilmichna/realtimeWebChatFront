import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    first,
    firstValueFrom,
    last,
    of,
    Subject,
} from 'rxjs';
import Swal from 'sweetalert2';
import { APP_CONF_TOKEN, ICONFIG } from '../config';

interface AuthData {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedIn$ = new BehaviorSubject(false);
    authData: AuthData | null = null;
    isAuthenticated = false;
    constructor(
        @Inject(APP_CONF_TOKEN) private config: ICONFIG,
        private http: HttpClient,
        private router: Router
    ) {
        if (!this.authData && localStorage.getItem('authData')) {
            const data = localStorage.getItem('authData');
            if (data?.length) {
                try {
                    this.authData = JSON.parse(data);
                } catch (_) {}
            }
        }
    }

    setAuthData(authData: AuthData) {
        this.authData = authData;
    }

    saveAuthDataToLocalStorage() {
        localStorage.setItem('authData', JSON.stringify(this.authData));
    }

    requestAuth() {
        return this.http.get(this.config.BACKEND_PATH + '/user');
    }

    async isUserAuthenticated() {
        try {
            await firstValueFrom(this.requestAuth());
            this.loggedIn$.next(true);
            return true;
        } catch (_) {
            this.loggedIn$.next(false);
            return false;
        }
    }

    async logout() {
        localStorage.removeItem('authData');
        this.loggedIn$.next(false);
        this.router.navigate(['/login']);
    }

    authenticateUser(authData: AuthData) {
        this.setAuthData(authData);
        this.requestAuth().subscribe({
            next: () => {
                Swal.fire({
                    text: 'Logged in. You will be redirected to app after closing this modal.',
                    confirmButtonText: 'Let`s go!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.loggedIn$.next(true);
                        this.saveAuthDataToLocalStorage();
                        this.router.navigate(['/app']);
                    }
                });
            },
            error: (err) => {
                this.loggedIn$.next(false);
                Swal.fire('Bad user data!');
            },
        });
    }
}
