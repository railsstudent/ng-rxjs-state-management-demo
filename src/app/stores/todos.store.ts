import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models';
import { TodosService } from '../services';
import { Store } from './store';

@Injectable({
    providedIn: 'root',
})
export class TodosStore extends Store<Todo[]> {
    constructor(private todosService: TodosService) {
        super();
    }

    init() {
        if (this.getAll()) {
            console.log('Todo array cached in TodoStore');
            return;
        }

        this.todosService
            .getAll$()
            .pipe(tap(todos => this.store(todos)))
            .subscribe();
    }

    get$(id: number): Observable<Todo[]> {
        return this.getAll$().pipe(map(todos => todos.filter(todo => todo.id === id)));
    }
}