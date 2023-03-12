import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedIn$ = of(false);
    constructor() {}

    getUserName() {
        // Mock
        return 'You';
    }
}
