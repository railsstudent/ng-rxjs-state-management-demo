import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Post } from '../models/';
import { PostsService } from '../services/';
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
            console.log('cached in getAll()');
            return;
        }

        this.postsService
            .getAll$()
            .pipe(tap(posts => this.store(posts)))
            .subscribe();
    }
}
