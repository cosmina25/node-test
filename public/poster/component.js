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
    var PosterComponent;
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
            //noinspection JSAnnotator
            PosterComponent = (function () {
                function PosterComponent(_poster, _router, _params, _observable) {
                    this._poster = _poster;
                    this._router = _router;
                    this._params = _params;
                    this._observable = _observable;
                    this.poster = new model_1.Poster;
                    this.action = 'create';
                }
                PosterComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._poster.retrieve().subscribe(function (poster) {
                        _this.action = 'update';
                        _this.poster = poster;
                    }, function (err) { });
                };
                PosterComponent.prototype.create = function () {
                    var _this = this;
                    this._observable.subscribe(this._poster.create(this.poster), function (user) {
                        _this._alert.add(new component_1.Alert('success', 'Esti un poster!'));
                        _this._router.navigate(['User', { action: 'panel' }]);
                    });
                };
                PosterComponent.prototype.update = function () {
                    var _this = this;
                    this._observable.subscribe(this._poster.update(this.poster), function (user) {
                        _this._alert.add(new component_1.Alert('success', 'Modificat cu succes!'));
                        _this._router.navigate(['User', { action: 'panel' }]);
                    });
                };
                PosterComponent.prototype.submit = function () {
                    this[this.action]();
                };
                __decorate([
                    core_1.ViewChild(component_1.AlertComponent), 
                    __metadata('design:type', component_1.AlertComponent)
                ], PosterComponent.prototype, "_alert", void 0);
                PosterComponent = __decorate([
                    core_1.Component({
                        selector: 'poster',
                        templateUrl: './poster/index.html',
                        directives: [component_1.AlertComponent],
                        providers: [
                            service_1.PosterService
                        ]
                    }), 
                    __metadata('design:paramtypes', [service_1.PosterService, router_1.Router, router_1.RouteParams, utilities_1.ObservableUtilities])
                ], PosterComponent);
                return PosterComponent;
            }());
            exports_1("PosterComponent", PosterComponent);
            exports_1("PosterService", service_1.PosterService);
            exports_1("Poster", model_1.Poster);
        }
    }
});
//# sourceMappingURL=component.js.map