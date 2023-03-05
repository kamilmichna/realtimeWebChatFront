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
    constructor() {}

    emitNotification(description: string, type: 'success' | 'info' | 'warning') {
        this.notification$.next({
            id: nanoid(),
            description,
            type
        });
    }
}
