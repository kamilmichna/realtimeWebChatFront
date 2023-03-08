import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { BehaviorSubject, Subject } from 'rxjs';

export interface INotification {
    id: string,
    description: string,
    type: 'success' | 'info' | 'warning'
  }

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    notification$ = new Subject<INotification>();
    notifications: any = [];
    constructor() {}

    emitNotification(description: string, type: 'success' | 'info' | 'warning') {
        const notification = {
            id: nanoid(),
            description,
            type
        };
        
        this.notification$.next(notification);
    }
}
