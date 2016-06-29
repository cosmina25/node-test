import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import{AlertComponent,Alert} from '../directives/alert/component' ;
import { PaginationComponent } from '../directives/pagination/component';


import { UserService } from '../user/service';
import { ObservableUtilities } from '../common/utilities';
import{ User} from '../user/component';
import { Comment, CommentList} from './model'
import { CommentService } from './service';


@Component({
    selector: 'comment',
    templateUrl: './comment/index.html',
    directives: [
        PaginationComponent,
        AlertComponent
    ],
    providers: [
        UserService,
        CommentService

    ]
})
export class CommentListComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    signup: boolean = false;
    user: User= new User;
    //noinspection TypeScriptValidateTypes
    list: CommentList = new  CommentList;
    comment: Comment = new Comment;
    


    constructor (
        private _comment: CommentService,
        private _router: Router,
        private _params: RouteParams,
        private _user: UserService,
        private _observable: ObservableUtilities
    ) {}

    ngOnInit () {
        this.signup = this._params.get('action') === 'signup';
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        let page = this._params.get("page");
        if(page) {
            this.list.page = Number(page);
        }

        // check for size in cookie 'articles-per-page'

        this.list.params = _.pick({
            title: this._params.get("title")
        }, _.identity);

        this.update();
    }

   
    signout () {
        this._user.signout();
        this._router.navigate(['User', { action: 'signin' }]); //// dau click pe signout-->user-signin
    }

    update () {
        this._observable.subscribe(this._comment.retrieveRange(this.list));
    }
    page (page: number) {
        //noinspection TypeScriptValidateTypes
        this.list.page = page;
        this._router.navigate(['Comments', _.assign(this._params.params, { page: page })]);
        this.update();
    }

    submit () {
        this._observable.subscribe(this._comment.create(this.comment), comment => {

            this.comment.content = '';

            this._alert.add(new Alert('success', 'Commet creat!'));
        });
    }

}