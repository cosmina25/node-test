System.register(['angular2/core', 'angular2/router', '../directives/alert/component', '../common/utilities', './service', './model'], function(exports_1, context_1) {
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
    var core_1, router_1, component_1, utilities_1, service_1, model_1;
    var UserComponent;
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
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            //import { CommentListComponent } from '../comment/component';
            UserComponent = (function () {
                function UserComponent(_user, _router, _params, _observable) {
                    this._user = _user;
                    this._router = _router;
                    this._params = _params;
                    this._observable = _observable;
                    this.user = new model_1.User;
                    this.signup = false;
                }
                UserComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.signup = this._params.get('action') === 'signup';
                    this._observable.subscribe(this._user.retrieve(), function (user) { return _this.user = user; });
                };
                UserComponent.prototype.create = function () {
                    var _this = this;
                    this._observable.subscribe(this._user.create(this.user), function (user) {
                        _this._alert.add(new component_1.Alert('success', 'Felicitari, te-ai inregistrat!'));
                        _this._router.navigate(['Comment']);
                    });
                };
                UserComponent.prototype.signin = function () {
                    var _this = this;
                    this._observable.subscribe(this._user.signin(this.user), function (user) { return _this._router.navigate(['Comment']); });
                };
                UserComponent.prototype.signout = function () {
                    this._user.signout();
                    this._router.navigate(['User', { action: 'signin' }]);
                };
                UserComponent.prototype.submit = function () {
                    this.signup ? this.create() : this.signin();
                };
                __decorate([
                    core_1.ViewChild(component_1.AlertComponent), 
                    __metadata('design:type', component_1.AlertComponent)
                ], UserComponent.prototype, "_alert", void 0);
                UserComponent = __decorate([
                    core_1.Component({
                        selector: 'user',
                        templateUrl: './user/index.html',
                        directives: [
                            component_1.AlertComponent
                        ],
                        providers: [
                            service_1.UserService
                        ]
                    }), 
                    __metadata('design:paramtypes', [service_1.UserService, router_1.Router, router_1.RouteParams, utilities_1.ObservableUtilities])
                ], UserComponent);
                return UserComponent;
            }());
            exports_1("UserComponent", UserComponent);
            exports_1("UserService", service_1.UserService);
            exports_1("User", model_1.User);
        }
    }
});
//# sourceMappingURL=component.js.map