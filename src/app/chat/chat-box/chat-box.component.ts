import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../chat.service';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
    @Input() chatData: Chat | null = null;
    @Input() active: boolean = false;
    Array: any;
    constructor() {}

    ngOnInit(): void {}
}
