import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models';
import { TodosStore } from '../stores';

@Component({
    selector: 'todo-list',
    template: `
        <p class="title">Todos</p>
        <div class="container" *ngFor="let todo of (todos$ | async)">
            <ul>
                <li>ID: {{ todo.id }}</li>
                <li>USER ID: {{ todo.userId }}</li>
                <li>TITLE: {{ todo.title }}</li>
                <li>COMPLETED: {{ todo.completed }}</li>
            </ul>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            .title {
                text-decoration: underline;
                font-size: 1em;
            }

            .container {
                padding: 1rem;
                margin-bottom: 1rem;
                border: 2px solid #9a9a9a;
                border-radius: 5px;
            }

            .container > ul {
                padding-left: 1.5rem;
            }

            .container > ul > li {
                margin-bottom: 5px;
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

        // this.todosStore.search$.subscribe();
    }
}
