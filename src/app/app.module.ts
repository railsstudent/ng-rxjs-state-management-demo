import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostListComponent } from './post/post-list.component';
import { TodoListComponent, TodoSearchComponent, TodoShellComponent } from './todo';

@NgModule({
    declarations: [
        AppComponent,
        PostListComponent,
        TodoListComponent,
        NavbarComponent,
        TodoSearchComponent,
        TodoShellComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
