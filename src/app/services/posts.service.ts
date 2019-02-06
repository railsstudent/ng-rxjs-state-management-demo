import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

const URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    constructor(private http: HttpClient) {}

    get$ = (): Observable<Post[]> => this.http.get<Post[]>(URL);

    post$ = (post: Post): Observable<Post> => this.http.post<Post>(URL, { post });

    patch$ = (postId: number, post: Post): Observable<Post> => this.http.patch<Post>(`${URL}/${postId}`, { post });

    delete$ = (postId: number): Observable<Post> => this.http.delete<Post>(`${URL}/${postId}`);
}
