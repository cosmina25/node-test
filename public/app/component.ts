import { Component, provide } from 'angular2/core';
import { RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, RequestOptions } from 'angular2/http';
import { CookieService } from 'angular2-cookie/core';

import { AlertComponent, Alerts } from '../directives/alert/component'
import { UserComponent, UserService, User } from '../user/component';
import{ CommentListComponent} from '../comment/component';

import { ExtendedRequestOptions } from '../common/extensions';
import { ObservableUtilities } from '../common/utilities';
import {PosterComponent} from "../poster/component";



@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,

    //styleUrls: [ 'app/style.css' ],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        provide(RequestOptions, { useClass: ExtendedRequestOptions }),
        UserService,
        CookieService,
        provide(Alerts, { useValue: [] }),
        AlertComponent,
        ObservableUtilities
    ]
})
@RouteConfig([

    {
        path: '/user/:action',
        name: 'User',
        component: UserComponent
    },
    {
        path: '/',
        name: 'Comment',
        component: CommentListComponent,
        useAsDefault: true
    },
    {
        path: '/posters',
        name: 'Poster',
        component: PosterComponent
    }
    /*  {
     path: '/author',
     name: 'Author',
     component: AuthorComponent,
     },
     {
     path: '/article/:id',
     name: 'Article',
     component: ArticleComponent,
     },
     {
     path: '/articles',
     name: 'Articles',
     component: ArticleListComponent,
     },
     {
     path: '/article/:id/edit',
     name: 'ArticleEdit',
     component: ArticleEditComponent,
     },*/
])
export class AppComponent {

    constructor(private _user: UserService) {
        this._user.retrieve().subscribe(user => this._user.user = user, () => {});
    }
}
