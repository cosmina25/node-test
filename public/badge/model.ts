import { List } from '../common/classes';
import { User } from '../user/model';
import { Comment } from '../comment/model';

export class Badge {
    type : string;
    _id: string;
    user:User;
    comment: Comment;

    constructor() {
        this.type = '' ;
        this._id = '';
        this.user = new User;
        this.comment= new Comment;
    }

}
export class BadgeList extends List {
    items: Array<Badge>; // Specify that it's an Article Array
}