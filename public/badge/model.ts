import { User } from '../user/model';
import { Comment } from '../comment/model';


export class Badge {
    _id: string;
    user: User;
    comment: Comment;
    type: string;
    
    constructor( comment?: Comment , type? : string) {
        this._id = '';
        this.user =  new User;
        this.comment = comment || new Comment;
        this.type = type || '';
        
    }
}
