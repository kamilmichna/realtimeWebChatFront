import { Component, Input, OnInit } from '@angular/core';
import { Chat, ChatService, Message } from '../chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() selectedChat: Chat | null = null;
    messages: Message[] | null = null;

    constructor(private chatSvc: ChatService) {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.messages = this.chatSvc.getMessagesInChat();
    }
}
