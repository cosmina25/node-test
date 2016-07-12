System.register(['angular2/core', './service', '../user/service', '../comment/component', './model', '../poster/model', "../common/utilities"], function(exports_1, context_1) {
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
    var core_1, service_1, service_2, component_1, model_1, model_2, utilities_1;
    var BadgeCount, BadgeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (service_2_1) {
                service_2 = service_2_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (model_2_1) {
                model_2 = model_2_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            BadgeCount = (function () {
                function BadgeCount() {
                }
                return BadgeCount;
            }());
            exports_1("BadgeCount", BadgeCount);
            BadgeComponent = (function () {
                function BadgeComponent(_user, _badge, _observable) {
                    this._user = _user;
                    this._badge = _badge;
                    this._observable = _observable;
                    this.badges = [];
                }
                BadgeComponent.prototype.ngOnInit = function () {
                    var count = {};
                    for (var _i = 0, _a = this.comment.badges; _i < _a.length; _i++) {
                        var badge = _a[_i];
                        count[badge.type] = count[badge.type] || count[badge.type] === 0 ? count[badge.type] + 1 : 0;
                    }
                    for (var badge in count) {
                        if (count.hasOwnProperty(badge)) {
                            this.badges.push({
                                type: badge,
                                count: count[badge]
                            });
                        }
                    }
                    var defaultBadges = ['fa-bomb', 'fa-cubes', 'fa-heart', this.poster.badge];
                    for (var _b = 0, defaultBadges_1 = defaultBadges; _b < defaultBadges_1.length; _b++) {
                        var defaultBadge = defaultBadges_1[_b];
                        if (!count[defaultBadge] && count[defaultBadge] !== 0) {
                            this.badges.push({
                                type: defaultBadge,
                                count: 0
                            });
                        }
                    }
                };
                BadgeComponent.prototype.onClick = function (type) {
                    var _this = this;
                    this._observable.subscribe(this._badge.create(new model_1.Badge(this.comment, type)), function () {
                        for (var _i = 0, _a = _this.badges; _i < _a.length; _i++) {
                            var badge = _a[_i];
                            if (badge.type === type) {
                                badge.count++;
                            }
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', component_1.Comment)
                ], BadgeComponent.prototype, "comment", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', model_2.Poster)
                ], BadgeComponent.prototype, "poster", void 0);
                BadgeComponent = __decorate([
                    core_1.Component({
                        selector: 'badges',
                        templateUrl: './badge/index.html',
                        providers: [
                            service_1.BadgeService
                        ]
                    }), 
                    __metadata('design:paramtypes', [service_2.UserService, service_1.BadgeService, utilities_1.ObservableUtilities])
                ], BadgeComponent);
                return BadgeComponent;
            }());
            exports_1("BadgeComponent", BadgeComponent);
            exports_1("BadgeService", service_1.BadgeService);
            exports_1("Badge", model_1.Badge);
        }
    }
});
//# sourceMappingURL=component.js.map