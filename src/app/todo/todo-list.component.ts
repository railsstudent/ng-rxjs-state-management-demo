import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { empty, merge, Observable, Subject } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Todo } from '../models';
import { TodosStore } from '../stores';

@Component({
    selector: 'todo-list',
    template: `
        <p class="title">Todos</p>
        <p class="count">Number of todos: {{ todosCount$ | async }}</p>
        <div class="container" *ngFor="let todo of (todos$ | async)">
            <ul>
                <li>ID: {{ todo.id }}</li>
                <li>USER ID: {{ todo.userId }}</li>
                <li>TITLE: {{ todo.title }}</li>
                <li>COMPLETED: {{ todo.completed }}</li>
                <li><button type="button" class="delete" (click)="deleteClick$.next(todo.id)">Delete</button></li>
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

            .count {
                font-size: 1.25em;
                color: #8a8a8a;
                padding-top: 1rem;
                padding-bottom: 1rem;
            }

            button.delete {
                background: red;
                color: white;
                padding: 0.5rem;
                border-color: transparent;
                border-radius: 5px;
                font-size: 1em;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;
    todosCount$: Observable<number>;
    deleteClick$ = new Subject<number>();

    private handleError(err: Error) {
        console.log(err);
        return empty();
    }

    constructor(private todosStore: TodosStore) {
        this.todosStore.init();
    }

    ngOnInit() {
        const searchTodo$ = this.todosStore.search$.pipe(
            switchMap(id => this.todosStore.get$(id).pipe(catchError(err => this.handleError(err)))),
        );

        const deleteTodo$ = this.deleteClick$.pipe(
            exhaustMap(todoId => this.todosStore.delete$(todoId).pipe(catchError(err => this.handleError(err)))),
        );

        this.todos$ = merge(searchTodo$, deleteTodo$);
        this.todosCount$ = this.todosStore.getAll$().pipe(map(todos => (todos && todos.length) || 0));
    }
}
