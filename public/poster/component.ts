import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

import { AlertComponent, Alert } from '../directives/alert/component';
import { ObservableUtilities } from '../common/utilities';
import { PosterService } from './service';
import { Poster } from './model';

//noinspection JSAnnotator
@Component({
    selector: 'poster',
    templateUrl: './poster/index.html',
    directives: [AlertComponent],
    providers: [
        PosterService
    ]
})

export class PosterComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    poster: Poster = new Poster;
    action : string ='create';
    
    constructor(
        private _poster: PosterService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ){}

    ngOnInit () {
        this._poster.retrieve().subscribe(poster => {
            this.action = 'update';
            this.poster = poster;
        }, err => {});
    }

    create () {
        this._observable.subscribe(this._poster.create(this.poster), user => {
            this._alert.add(new Alert('success', 'Esti un poster!'));
            this._router.navigate(['User', { action: 'panel' }])
        });
    }

    update () {
        this._observable.subscribe(this._poster.update(this.poster), user => {
            this._alert.add(new Alert('success', 'Modificat cu succes!'));
            this._router.navigate(['User', { action: 'panel' }])
        });
    }

    submit () {
        this[this.action]();
    }
}

export { PosterService, Poster };
