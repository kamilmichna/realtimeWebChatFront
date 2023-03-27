import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
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
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    onChatClicked(chatId: string) {
        this.chatClicked.emit(chatId);
    }

    async openNewChatModal() {
        const inputOptions: any = {};
        const availableUsers = (
            await firstValueFrom(this.authService.getAllUsers())
        ).forEach((username: String) => {
            inputOptions['username'] = username;
        });
        const { value: user } = await Swal.fire({
            title: 'Create new chat',
            input: 'select',
            inputOptions: inputOptions,
            inputPlaceholder: 'Select user to create chat',
            showCancelButton: true,
        });
    }
}
