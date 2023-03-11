import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { Observable, of } from 'rxjs';

export interface Chat {
    id: string;
    users: string[];
    lastMessage: Message;
    lastMessageDate: Date;
}

export interface Message {
    sender: string;
    content: string;
    timestamp: Date;
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor() {}

    getAllUserChats(): Observable<Chat[]> {
        // MOCK
        return of([
            {
                id: nanoid(),
                users: ['Jan Kowalski'],
                lastMessage: {
                    sender: 'Jan Kowalski',
                    content: 'Co u Ciebie',
                    timestamp: new Date(),
                },
                lastMessageDate: new Date(),
            },
            {
                id: nanoid(),
                users: ['Jan Nowak'],
                lastMessage: {
                    sender: 'Jan Nowak',
                    content: 'Co słychać',
                    timestamp: new Date(),
                },
                lastMessageDate: new Date(),
            },
        ]);
    }

    getMessagesInChat(): Message[] {
        // MOCK
        return [
            {
                sender: 'Jan Kowalski',
                content: 'Co u Ciebie',
                timestamp: new Date(),
            },
            {
                sender: 'Jan Kowalski',
                content: 'Wszystko dobrze?',
                timestamp: new Date(),
            },
        ];
    }
}
