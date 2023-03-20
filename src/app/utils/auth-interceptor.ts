import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.auth.authData) return next.handle(req);
        const { username, password } = this.auth.authData;
        const auth = btoa(`${username}:${password}`);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Basic ${auth}`),
        });

        return next.handle(authReq);
    }
}
