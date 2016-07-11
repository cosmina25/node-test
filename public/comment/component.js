System.register(['angular2/core', 'angular2/router', '../directives/alert/component', '../directives/pagination/component', '../badge/component', '../user/service', '../common/utilities', '../user/component', './model', './service', '../poster/component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, component_1, component_2, component_3, service_1, utilities_1, component_4, model_1, service_2, component_5;
    var CommentListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (component_2_1) {
                component_2 = component_2_1;
            },
            function (component_3_1) {
                component_3 = component_3_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (component_4_1) {
                component_4 = component_4_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (service_2_1) {
                service_2 = service_2_1;
            },
            function (component_5_1) {
                component_5 = component_5_1;
            }],
        execute: function() {
            CommentListComponent = (function () {
                function CommentListComponent(_comment, _router, _params, _user, _observable) {
                    this._comment = _comment;
                    this._router = _router;
                    this._params = _params;
                    this._user = _user;
                    this._observable = _observable;
                    this.signup = false;
                    this.user = new component_4.User;
                    //noinspection TypeScriptValidateTypes
                    this.list = new model_1.CommentList;
                    this.comment = new model_1.Comment;
                    this.poster = new component_5.Poster;
                }
                CommentListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.signup = this._params.get('action') === 'signup';
                    this._observable.subscribe(this._user.retrieve(), function (user) {
                        _this.user = user;
                        // Poster service get
                    });
                    var page = this._params.get("page");
                    if (page) {
                        this.list.page = Number(page);
                    }
                    // check for size in cookie 'articles-per-page'
                    this.list.params = _.pick({
                        content: this._params.get("content")
                    }, _.identity);
                    this.update();
                };
                CommentListComponent.prototype.signout = function () {
                    this._user.signout();
                    this._router.navigate(['User', { action: 'signin' }]); //// dau click pe signout-->user-signin
                };
                CommentListComponent.prototype.update = function () {
                    this._observable.subscribe(this._comment.retrieveRange(this.list));
                };
                CommentListComponent.prototype.page = function (page) {
                    //noinspection TypeScriptValidateTypes
                    this.list.page = page;
                    this._router.navigate(['Comment', _.assign(this._params.params, { page: page })]);
                    this.update();
                };
                CommentListComponent.prototype.profile = function () {
                    this._router.navigate(['Poster']);
                };
                CommentListComponent.prototype.submit = function () {
                    var _this = this;
                    this._observable.subscribe(this._comment.create(this.comment), function (comment) {
                        _this.comment.content = '';
                        _this._alert.add(new component_1.Alert('success', 'Commet creat!'));
                        _this.update();
                    });
                };
                __decorate([
                    core_1.ViewChild(component_1.AlertComponent), 
                    __metadata('design:type', component_1.AlertComponent)
                ], CommentListComponent.prototype, "_alert", void 0);
                CommentListComponent = __decorate([
                    core_1.Component({
                        selector: 'comment',
                        templateUrl: './comment/index.html',
                        directives: [
                            component_2.PaginationComponent,
                            component_1.AlertComponent,
                            component_3.BadgeComponent
                        ],
                        providers: [
                            service_2.CommentService
                        ]
                    }), 
                    __metadata('design:paramtypes', [service_2.CommentService, router_1.Router, router_1.RouteParams, service_1.UserService, utilities_1.ObservableUtilities])
                ], CommentListComponent);
                return CommentListComponent;
            }());
            exports_1("CommentListComponent", CommentListComponent);
            exports_1("CommentService", service_2.CommentService);
            exports_1("Comment", model_1.Comment);
        }
    }
});
//# sourceMappingURL=component.js.map