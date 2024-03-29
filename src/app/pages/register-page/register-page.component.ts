import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { z } from 'zod';

@UntilDestroy()
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    userData = {
        username: '',
        password: '',
        passwordRepeat: '',
    };
    constructor(
        private auth: AuthService,
        private notificationService: NotificationService
    ) {}

    submitForm(e: Event) {
        e.preventDefault();
        if (this.validateUserData()) {
            this.auth.registerUser(this.userData);
        }
    }

    validateUserData() {
        const schema = z
            .object({
                username: z.string().min(1),
                password: z.string().min(1),
                passwordRepeat: z.string().min(1),
            })
            .refine((data) => data.password === data.passwordRepeat, {
                message: 'Passwords don`t match',
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

    ngOnInit(): void {}
}
