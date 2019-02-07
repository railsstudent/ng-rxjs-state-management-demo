import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    constructor(private http: HttpClient) {}

    getAll$ = (): Observable<Todo[]> => this.http.get<Todo[]>(URL);

    get$ = (id: number): Observable<Todo> => this.http.get<Todo>(`${URL}/${id}`);

    post$ = (todo: Todo): Observable<Todo> => this.http.post<Todo>(URL, { todo });

    patch$ = (todoId: number, todo: Todo): Observable<Todo> => this.http.patch<Todo>(`${URL}/${todoId}`, { todo });

    delete$ = (todoId: number): Observable<Todo> => this.http.delete<Todo>(`${URL}/${todoId}`);
}
