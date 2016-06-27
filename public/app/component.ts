import { Component, provide } from 'angular2/core';
import { RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, RequestOptions } from 'angular2/http';
import { CookieService } from 'angular2-cookie/core';

import { AlertComponent, Alerts } from '../alert/component'
import { UserComponent, UserService } from '../user/component';

import { ExtendedRequestOptions } from '../common/extensions';
import { ObservableUtilities } from '../common/utilities';

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
        path: '/',
        name: 'Home',
        component: UserComponent,
        useAsDefault: true
    },
    {
        path: '/user/:action',
        name: 'User',
        component: UserComponent
    },
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
export class AppComponent {}
