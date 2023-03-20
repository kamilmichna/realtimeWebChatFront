import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONF_TOKEN, ICONFIG } from 'src/app/config';
import { NotificationService } from 'src/app/services/notification.service';
import { z } from 'zod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    userData = {
        username: '',
        password: '',
    };
    constructor(
        private notificationService: NotificationService,
        private auth: AuthService
    ) {}

    validateUserData() {
        const schema = z.object({
            username: z.string().min(1),
            password: z.string().min(1),
        });

        try {
            schema.parse(this.userData);
            return true;
        } catch (errorField: any) {
            if (Array.isArray(errorField?.issues)) {
                errorField?.issues.forEach((error: { message: any }) => {
                    this.notificationService.emitNotification(
                        error.message,
                        'warning'
                    );
                });
            }
            return false;
        }
    }

    submitForm(e: Event) {
        e.preventDefault();
        if (this.validateUserData()) {
            this.auth.setAuthData(this.userData);

            const data = this.auth.authenticateUser(this.userData);
            console.log(data);
        }
    }

    ngOnChanges() {
        this.validateUserData();
    }
    ngOnInit(): void {}
}
