import { User } from '../user/model';
import { Comment } from '../comment/model';

export class Badge {
    _id: string;
    type: string;
    user: User;
    comment: Comment;

    contructor(user: User, comment: Comment, type: string) {
        this._id = '';
        this.type = type || '';
        this.user = user || new User;
        this.comment = comment || new Comment;
    }
}
