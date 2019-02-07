import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostListComponent } from './post/post-list.component';
import { TodoListComponent } from './todo/todo-list.component';

@NgModule({
    declarations: [AppComponent, PostListComponent, TodoListComponent, NavbarComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
