import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post/post-list.component';
import { TodoShellComponent } from './todo/todo-shell.component';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
    },
    {
        path: 'todos',
        component: TodoShellComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
