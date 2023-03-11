import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HeaderComponent } from './ui/header/header.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { NotificationsContainerComponent } from './ui/notifications-container/notifications-container.component';
import { UsersListComponent } from './chat/users-list/users-list.component';
import { ChatModule } from './chat/chat.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        RegisterPageComponent,
        MainPageComponent,
        HeaderComponent,
        LayoutComponent,
        NotificationsContainerComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, ChatModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
