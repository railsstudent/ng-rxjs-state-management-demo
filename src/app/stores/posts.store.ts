import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Store } from './store';

@Injectable({
    providedIn: 'root',
})
export class PostsStore extends Store<Post[]> {
    constructor(private postsService: PostsService) {
        super();
    }

    init() {
        if (this.getAll()) {
            return;
        }

        this.postsService
            .get$()
            .pipe(
                tap(posts => console.log('posts', posts)),
                tap(posts => this.store(posts)),
            )
            .subscribe();
    }
}
