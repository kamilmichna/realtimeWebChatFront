import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { ChatComponent } from './chat/chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UsersListComponent,
        ChatComponent,
        ChatBoxComponent,
        MessageBoxComponent,
    ],
    exports: [UsersListComponent, ChatComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class ChatModule {}
