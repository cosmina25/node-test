import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
//import  _ from 'underscore';

import { AlertComponent, Alert } from '../alert/component';
import { ObservableUtilities } from '../common/utilities';
import { UserService } from './service';
import { User } from './model';
//import { AuthorService, Author } from '../author/component';

@Component({
    selector: 'user',
    templateUrl: './user/index.html',
    directives: [
        AlertComponent
    ],
    providers: [
        UserService,
       // AuthorService
    ]
})
export class UserComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    user: User = new User;
    //author: Author;
    action: string = 'signin';

    constructor(
        private _user: UserService,
        //private _author: AuthorService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    ngOnInit () {
        if (this._params.get('action') === 'signup') {
            this.action = 'create';
        }

        this._user.retrieve().subscribe(user => {
            this.user = user;
            //if (_.contains(user.roles, 'author')) {
                //this._observable.subscribe(this._author.retrieve(user._id), author => this.author = author);
            //}
        }, err => {});
    }

    create () {
        this._observable.subscribe(this._user.create(this.user), user => {
            this._alert.add(new Alert('success', 'Felicitari, te-ai inregistrat!'));
            this._router.navigate(['Home']);
        });
    }

    signin () {
        this._observable.subscribe(this._user.signin(this.user), user => this._router.navigate(['User', { action: 'panel' }]));
    }

    signout () {
        this._user.signout();
        this._router.navigate(['User', { action: 'signin' }]);
    }

    submit () {
        this[this.action]();
    }
}

export { UserService, User };
