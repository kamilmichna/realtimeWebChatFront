import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { z } from "zod";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    userData = {
        email: '',
        password: '',
        rememberMe: false
    }
    constructor(private notificationService: NotificationService) {}


    validateUserData() {
        const schema = z.object({
            email: z.string().email(),
            password: z.string()?.min(6),
            rememberMe: z.boolean()
        })

        try {
            schema.parse(this.userData);
            return true;
        } catch (errorField: any) {
            if (Array.isArray(errorField?.issues)){
                errorField?.issues.forEach((error: { message: any; }) => {
                    this.notificationService.emitNotification(error.message, 'warning');
                })  
            }
            return false;
        }
    }

    submitForm(e: Event) {
        e.preventDefault();
        if (this.validateUserData()){};
    }

    ngOnChanges(){
        this.validateUserData();
    }
    ngOnInit(): void {}
}
