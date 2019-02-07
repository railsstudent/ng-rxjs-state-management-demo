import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsStore } from '../stores/posts.store';

@Component({
    selector: 'post-list',
    template: `
        <p>Posts</p>
        <div class="container" *ngFor="let post of (posts$ | async)">
            <ul>
                <li>ID: {{ post.id }}</li>
                <li>TITLE: {{ post.title }}</li>
                <li>BODY: {{ post.body }}</li>
            </ul>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
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
export class PostListComponent implements OnInit {
    posts$: Observable<Post[]>;

    constructor(private postsStore: PostsStore) {
        this.postsStore.init();
    }

    ngOnInit() {
        this.posts$ = this.postsStore.getAll$();
    }
}
