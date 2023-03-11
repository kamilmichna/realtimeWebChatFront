import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable, of, Subject, tap } from 'rxjs';
import { Chat, ChatService } from 'src/app/chat/chat.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    allChats$: Observable<Chat[]> = this.chatSvc.getAllUserChats();
    selectedChatId$ = new Subject<string>();

    selectedChat$ = combineLatest([this.allChats$, this.selectedChatId$]).pipe(
        map(([chats, selectedChatId]) => {
            if (!selectedChatId) {
                return chats[0];
            }
            return chats.find((chat) => chat.id === selectedChatId) || null;
        })
    );

    constructor(private chatSvc: ChatService) {}

    ngOnInit(): void {}

    selectChat(chatId: string) {
        this.selectedChatId$.next(chatId);
    }
}
