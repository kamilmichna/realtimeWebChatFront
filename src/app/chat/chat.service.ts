import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { combineLatest, filter, map, Observable, of, Subject } from 'rxjs';
import { APP_CONF_TOKEN, ICONFIG } from '../config';
import { AuthService } from '../services/auth.service';

export interface Chat {
    id: string;
    user: any;
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

    constructor(
        private http: HttpClient,
        @Inject(APP_CONF_TOKEN) private config: ICONFIG,
        private authService: AuthService
    ) {}

    getAllUserChats(): Observable<Chat[]> {
        return this.http.get(this.config.BACKEND_PATH + '/chats').pipe(
            filter((data) => Array.isArray(data) && data.length > 0),
            map((list) =>
                (list as Array<any>)?.map((item) => {
                    return {
                        id: item.id,
                        user: item.users?.find(
                            (user: any) =>
                                user.username !==
                                this.authService.authData?.username
                        ),
                        lastMessage: {
                            sender: 'Jan Kowalski',
                            content: 'Co u Ciebie',
                            timestamp: new Date(),
                            state: 'VIEWED',
                        },
                        lastMessageDate: new Date(),
                    };
                })
            )
        );
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

    createNewChat(userId: string, secondUserId: string) {
        return this.http
            .post(this.config.BACKEND_PATH + '/chats', {
                users: [
                    {
                        username: userId,
                    },
                    {
                        username: secondUserId,
                    },
                ],
            })
            .subscribe({
                next: () => console.log('DATA'),
                error: (err) => err,
            });
    }
}
