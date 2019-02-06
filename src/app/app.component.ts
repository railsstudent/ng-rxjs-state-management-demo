import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './models/post.model';
import { PostsStore } from './stores/posts.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'ng-rxjs-state-management-demo';

    posts$: Observable<Post[]>;

    constructor(private postsStore: PostsStore) {
        this.postsStore.init();
    }

    ngOnInit() {
        this.posts$ = this.postsStore.getAll$();
    }
}
