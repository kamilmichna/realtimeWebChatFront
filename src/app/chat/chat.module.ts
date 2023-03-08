import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { ControlsBoxComponent } from './controls-box/controls-box.component';
import { ChatComponent } from './chat/chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';



@NgModule({
  declarations: [
    UsersListComponent,
    ControlsBoxComponent,
    ChatComponent,
    ChatBoxComponent
  ],
  exports: [
    UsersListComponent,
    ControlsBoxComponent,
    ChatComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
