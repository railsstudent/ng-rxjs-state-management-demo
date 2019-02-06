import { Post } from '../models/post.model';
import { Store } from './store';

export class PostsStore extends Store<Post[]> {}
