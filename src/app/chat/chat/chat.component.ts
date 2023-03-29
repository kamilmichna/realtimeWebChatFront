import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';
import { Chat, ChatService, Message } from '../chat.service';

@UntilDestroy()
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() selectedChat: Chat | null = null;
    messages: Message[] | null = null;
    authData$ = this.authService.authData$;
    constructor(
        private chatSvc: ChatService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.messages = this.chatSvc.getMessagesInChat();
    }
}
