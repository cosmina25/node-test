import { List } from '../common/classes';
import { User } from '../user/model';
import { BadgeCount} from '../badge/component';

export class Comment {
    _id: string;
    user: User;
    content: string;
    badges : Array<BadgeCount>;
    

    constructor() {
        this._id = '';
        this.user =  new User;
        this.content = '';
        this.badges = [];
    }
}

export class CommentList extends List {
    items: Array<Comment>; // Specify that it's an Article Array
}