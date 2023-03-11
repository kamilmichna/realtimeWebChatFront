import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Chat, ChatService } from '../chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() selectedChat: Chat | null = null;
    constructor() {}

    ngOnInit(): void {}
}
