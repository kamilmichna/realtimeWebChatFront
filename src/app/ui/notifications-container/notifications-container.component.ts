import { Component, OnInit } from '@angular/core';
import {
    INotification,
    NotificationService,
} from 'src/app/services/notification.service';

@Component({
    selector: 'app-notifications-container',
    templateUrl: './notifications-container.component.html',
    styleUrls: ['./notifications-container.component.scss'],
})
export class NotificationsContainerComponent implements OnInit {
    notifications$ = this.notificationsService.notification$;
    notifications: INotification[] = [];

    constructor(private notificationsService: NotificationService) {}

    ngOnInit(): void {
        this.notificationsService.notification$.subscribe(
            (notification: INotification) => {
                if (this.notifications.length > 5) {
                    this.notifications.shift();
                }
                this.notifications.push(notification);
            }
        );
    }

    onDelete(idToDelete: string) {
        this.notifications = this.notifications.filter(
            (item) => item.id !== idToDelete
        );
    }
}
