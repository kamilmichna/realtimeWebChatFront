import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import {
    combineLatest,
    filter,
    map,
    Observable,
    of,
    share,
    Subject,
    tap,
} from 'rxjs';
import { APP_CONF_TOKEN, ICONFIG } from '../config';
import { AuthService } from '../services/auth.service';

export interface Chat {
    id: number;
    user: any;
    lastMessage: any;
    lastMessageDate: Date;
}

type MessageState = 'SENDING' | 'SEND' | 'VIEWED';

export interface Message {
    content: string;
    sender: string;
    sendTime: string;
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    allChats$: Observable<Chat[]> = this.getAllUserChats();
    selectedChatId$ = new Subject<number>();
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

    getMessagesInChat(chatId: number): Observable<Message[]> {
        return this.http
            .get(this.config.BACKEND_PATH + `/chats/${chatId}/messages`)
            .pipe(
                map((messages) => {
                    return (messages as Array<any>)
                        ?.map((item) => {
                            const { user: user, ...data } = item;
                            return {
                                ...data,
                                sender: user?.username || user,
                            };
                        })
                        .sort((a, b) => {
                            return (
                                new Date(a.sendTime).getTime() -
                                new Date(b.sendTime).getTime()
                            );
                        });
                }),
                tap((data) => console.log(data))
            );
    }

    createNewChat(userId: string, secondUserId: string) {
        if (!userId || !secondUserId) return;
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
                next: () => console.log('CHAT CREATED'),
                error: (err) => err,
            });
    }

    sendMessageToChat(messageContent: string) {
        return this.http.post(this.config.BACKEND_PATH + '/messages', {
            content: messageContent,
            chat: {
                id: 1,
            },
        });
    }
}
