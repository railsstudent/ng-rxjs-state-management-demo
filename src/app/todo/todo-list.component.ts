import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models';
import { TodosStore } from '../stores';

@Component({
    selector: 'todo-list',
    template: `
        <ul *ngFor="let todo of (todos$ | async)">
            <li>ID: {{ todo.id }}</li>
            <li>USER ID: {{ todo.userId }}</li>
            <li>TITLE: {{ todo.title }}</li>
            <li>COMPLETED: {{ todo.completed }}</li>
        </ul>
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;

    constructor(private todosStore: TodosStore) {
        this.todosStore.init();
    }

    ngOnInit() {
        this.todos$ = this.todosStore.getAll$();
    }
}
