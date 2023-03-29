import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    isLoggedIn$ = this.authService.loggedIn$;
    authData$ = this.authService.authData$;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    onLogoutClicked() {
        this.authService.logout();
    }
}
