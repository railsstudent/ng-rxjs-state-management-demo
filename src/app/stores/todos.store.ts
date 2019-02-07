import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models';
import { TodosService } from '../services';
import { Store } from './store';

@Injectable({
    providedIn: 'root',
})
export class TodosStore extends Store<Todo[]> {
    private searchSub$ = new Subject<number | undefined>();
    search$ = this.searchSub$.asObservable();

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
        if (id) {
            return this.getAll$().pipe(
                map(todos => todos.filter(todo => todo.id === id)),
                tap(todos => this.store(todos)),
            );
        }
        return this.getAll$().pipe(tap(todos => this.store(todos)));
    }

    setSearch$(id: number | undefined) {
        this.searchSub$.next(id);
    }
}
