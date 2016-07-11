import  { User } from '../user/model';

export class Poster{
    _id: string;
    user: User;
    name: string;
    description: string;
    badge: string;
    
    constructor() {
        this._id = '';
        this.user = new User ;
        this.name = '' ;
        this.description = '';
        this.badge = '';
        
    } 
}