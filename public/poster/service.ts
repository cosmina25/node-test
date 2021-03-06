import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Poster } from './model';
import { ObservableUtilities } from '../common/utilities';

@Injectable()
export class PosterService {
    private _uri = 'api/poster';

    constructor (
        private _http: Http,
        private _observable: ObservableUtilities
    ) {}

    create (author: Poster): Observable<Poster> {
        return this._http.post(this._uri, JSON.stringify(author))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    retrieve (id: string = ''): Observable<Poster> {
        return this._http.get(`${this._uri}/${id}`)
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    update (author: Poster): Observable<Poster> {
        return this._http.put(`${this._uri}/${author._id}`, JSON.stringify(author))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    delete (id: string): Observable<Response> {
        return this._http.delete(`${this._uri}/${id}`)
            .catch(this._observable.error);
    }
}
