import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post/post-list.component';
import { TodoListComponent } from './todo/todo-list.component';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
    },
    {
        path: 'todos',
        component: TodoListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
