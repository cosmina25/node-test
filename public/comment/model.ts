import { List } from '../common/classes';
import { User } from '../user/model';
import { Badge} from '../badge/component';

export class Comment {
    _id: string;
    user: User;
    content: string;
    badges : Array<Badge>;
    

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