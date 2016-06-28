import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import{AlertComponent} from '../directives/alert/component' ;

import { UserService } from '../user/service';

@Component({
    selector: 'comment',
    templateUrl: './comment/index.html',
    directives: [
    ],
    providers: [
        UserService
    ]
})
export class CommentListComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    signup: boolean = false;

    constructor (
        private _router: Router,
        private _params: RouteParams,
        private _user: UserService
    ) {}

    ngOnInit () {
        this.signup = this._params.get('action') === 'signup';
        //this._observable.subscribe(this._user.retrieve(), user => this.user = user);
    }

    signout () {
        this._user.signout();
        this._router.navigate(['User', { action: 'signin' }]); //// dau click pe signout-->user-signin
    }


}