import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsStore } from '../stores/posts.store';

@Component({
    selector: 'post-list',
    template: `
        <ul *ngFor="let post of (posts$ | async)">
            <li>ID: {{ post.id }}</li>
            <li>TITLE: {{ post.title }}</li>
            <li>BODY: {{ post.body }}</li>
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
export class PostListComponent implements OnInit {
    posts$: Observable<Post[]>;

    constructor(private postsStore: PostsStore) {
        this.postsStore.init();
    }

    ngOnInit() {
        this.posts$ = this.postsStore.getAll$();
    }
}
