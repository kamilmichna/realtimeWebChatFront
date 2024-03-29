import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Chat, ChatService } from '../chat.service';

@UntilDestroy()
@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    @Input() chats: Chat[] | null = null;
    @Input() selectedChatId: number | null = null;
    @Output() chatClicked = new EventEmitter();
    constructor(
        private authService: AuthService,
        private chatService: ChatService
    ) {}

    ngOnInit(): void {}

    onChatClicked(chatId: number) {
        this.chatClicked.emit(chatId);
    }

    async openNewChatModal() {
        const inputOptions: any = {};
        const availableUsers = await firstValueFrom(
            this.authService
                .getAllUsers()
                .pipe(
                    map((usernames) =>
                        usernames.filter(
                            (username) =>
                                username !== this.authService.authData?.username
                        )
                    )
                )
        );
        availableUsers.forEach((username) => {
            inputOptions[username] = username;
        });

        const { value: userId } = await Swal.fire({
            title: 'Create new chat',
            input: 'select',
            inputOptions: inputOptions,
            inputPlaceholder: 'Select user to create chat',
            showCancelButton: true,
        });

        if (this.authService.authData) {
            this.chatService.createNewChat(
                this.authService.authData.username,
                userId
            );
        }
    }
}
