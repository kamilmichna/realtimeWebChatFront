import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable, of, Subject, tap } from 'rxjs';
import { Chat, ChatService } from 'src/app/chat/chat.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    allChats$: Observable<Chat[]> = this.chatSvc.allChats$;
    selectedChatId$ = this.chatSvc.selectedChatId$;

    selectedChat$ = this.chatSvc.selectedChat$;

    constructor(private chatSvc: ChatService) {}

    ngOnInit(): void {}

    selectChat(chatId: string) {
        this.chatSvc.selectedChatId$.next(chatId);
    }
}
