import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from '../chat.service';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
    @Input() message: Message | null = null;
    isOwned: boolean = false;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    ngOnChanges() {
        this.isOwned = this.isMessageOwnedByUser();
    }

    isMessageOwnedByUser() {
        if (!this.message) return false;
        return this.authService.getUserName() === this.message?.sender;
    }
}
