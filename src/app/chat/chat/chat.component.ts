import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';
import { Chat, ChatService, Message } from '../chat.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { firstValueFrom, Subject, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() selectedChat: Chat | null = null;
    messages: any | null = null;
    authData$ = this.authService.authData$;
    loadMessages$ = new Subject();
    messageContent = new FormControl('', [Validators.required]);
    @ViewChild('scrollContainer') private myScrollContainer!: ElementRef;

    constructor(
        private chatSvc: ChatService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loadMessages$
            .pipe(switchMap(() => this.chatSvc.getMessagesInChat()))
            .subscribe((messages) => {
                this.messages = messages;
            });
    }

    ngOnChanges() {
        this.loadMessages$.next(null);
    }

    async sendMessage() {
        if (!this.messageContent.valid) {
            Swal.fire('Message can`t be empty!');
        }

        await firstValueFrom(
            this.chatSvc.sendMessageToChat(this.messageContent.value)
        );
        this.loadMessages$.next(null);
    }
}
