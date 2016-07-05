import { Component, Input, Output, EventEmitter, OnInit } from 'angular2/core';
import { ObservableUtilities } from '../common/utilities'
import { RouteParams } from 'angular2/router';
import { CommentService, Comment } from '../comment/component';
//noinspection TypeScriptCheckImport
import  _ from 'underscore';

class Badge {
    type: string;
    count: number;
}

@Component({
    selector: 'badges',
    templateUrl: './badge/index.html',
    providers: [
        CommentService
    ]
})
export class BadgeComponent implements OnInit {
    @Input() comment: Comment ;
    @Output() change  = new EventEmitter<number>();

    badges: Array<Badge> = [];

    constructor(
        private _observable: ObservableUtilities,
        private _comment: CommentService
    ) {}

    ngOnInit () {
        let count = {};
        for (let badge of this.comment.badges) {
            count[badge.type] = count[badge.type] ? 0 : count[badge.type] + 1;
        }

        for (let badge in count) {
            if (count.hasOwnProperty(badge)) {
                this.badges.push({
                    type: badge,
                    count: count[badge]
                });
            }
        }
    }

}
export { Badge };