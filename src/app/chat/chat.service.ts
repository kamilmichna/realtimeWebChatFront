import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { combineLatest, map, Observable, of, Subject } from 'rxjs';

export interface Chat {
    id: string;
    users: string[];
    lastMessage: Message;
    lastMessageDate: Date;
}

type MessageState = 'SENDING' | 'SEND' | 'VIEWED';

export interface Message {
    sender: string;
    content: string;
    timestamp: Date;
    state: MessageState;
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    allChats$: Observable<Chat[]> = this.getAllUserChats();
    selectedChatId$ = new Subject<string>();

    selectedChat$ = combineLatest([this.allChats$, this.selectedChatId$]).pipe(
        map(([chats, selectedChatId]) => {
            if (!selectedChatId) {
                return chats[0];
            }
            return chats.find((chat) => chat.id === selectedChatId) || null;
        })
    );
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
                    state: 'VIEWED',
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
                    state: 'SEND',
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
                content: 'Wiadomość 1',
                timestamp: new Date(),
                state: 'VIEWED',
            },
            {
                sender: 'Jan Kowalski',
                content: 'Wiadomość 2',
                timestamp: new Date(),
                state: 'VIEWED',
            },
            {
                sender: 'You',
                content: 'Wiadomość 3',
                timestamp: new Date(),
                state: 'VIEWED',
            },
            {
                sender: 'Jan Kowalski',
                content: 'Wiadomość 4',
                timestamp: new Date(),
                state: 'SENDING',
            },
        ];
    }
}
