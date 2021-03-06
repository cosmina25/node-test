import { Component, Input,  OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { BadgeService } from './service' ;
import  { UserService } from '../user/service';
import { Comment } from '../comment/component';
import { Badge} from './model';
import  { Poster } from '../poster/model';

//noinspection TypeScriptCheckImport
import  _ from 'underscore';
import {from} from "rxjs/observable/from";
import {ObservableUtilities} from "../common/utilities";

export class BadgeCount {
    type: string;
    count: number;
    
}

@Component({
    selector: 'badges',
    templateUrl: './badge/index.html',
    providers: [
        BadgeService
    ]
})
export class BadgeComponent implements OnInit {
    @Input() comment: Comment ;
    @Input() poster: Poster;
    
    badges: Array<BadgeCount> = [];

    constructor(

    private _user: UserService,
    private _badge : BadgeService,
    private _observable: ObservableUtilities

    ) {}

    ngOnInit () {
        let count = {} ;
        for( let badge of this.comment.badges) {
            count[badge.type] = count[badge.type] || count[badge.type] === 0 ?  count[badge.type]+ 1  : 0 ;
        }

        for (let badge in count) {
            if (count.hasOwnProperty(badge)) {
                this.badges.push({
                    type: badge,
                    count: count[badge]
                });
            }
        }


        let defaultBadges = ['fa-bomb', 'fa-cubes', 'fa-heart', this.poster.badge] ;
        for(let defaultBadge of defaultBadges) {
            if(!count[defaultBadge] && count[defaultBadge] !==0 ) {
                this.badges.push({
                    type: defaultBadge,
                    count: 0
                });
            }
        }

        
    }

    onClick (type: string) {
        this._observable.subscribe(this._badge.create(new Badge(this.comment, type)), () => {
            for (let badge of this.badges) {
                if (badge.type === type) {
                    badge.count++;
                }
            }
        });
    }
}
export { BadgeService, Badge };