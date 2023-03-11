import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat, ChatService } from '../chat.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    @Input() chats: Chat[] | null = null;
    @Input() selectedChatId: string | null = null;
    @Output() chatClicked = new EventEmitter();
    constructor() {}

    ngOnInit(): void {}

    onChatClicked(chatId: string) {
        this.chatClicked.emit(chatId);
    }
}
