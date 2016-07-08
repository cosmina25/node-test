System.register(['angular2/http', '../common/utilities', 'angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var http_1, utilities_1, core_1;
    var CommentService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            CommentService = (function () {
                function CommentService(_http, _observable, _options) {
                    this._http = _http;
                    this._observable = _observable;
                    this._options = _options;
                    this._uri = 'api/comment';
                }
                CommentService.prototype.create = function (comment) {
                    //noinspection TypeScriptUnresolvedFunction
                    return this._http.post(this._uri, JSON.stringify(comment))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                CommentService.prototype.retrieve = function (id) {
                    //noinspection TypeScriptUnresolvedFunction
                    return this._http.get(this._uri + "/" + id)
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                CommentService.prototype.update = function (comment) {
                    // return this._http.put(`${this._uri}/${comment._id}`, JSON.stringify(comment))
                    return this._http.put(this._uri + "/" + comment._id, JSON.stringify(comment))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                CommentService.prototype.delete = function (id) {
                    return this._http.delete(this._uri + "/" + id)
                        .catch(this._observable.error);
                };
                CommentService.prototype.retrieveRange = function (list) {
                    var options = this._options;
                    var from = (list.page - 1) * list.size;
                    var to = from + list.size;
                    options.headers.set('Range', "comments=" + from + "-" + to);
                    var search = new http_1.URLSearchParams;
                    for (var param in list.params) {
                        if (list.params.hasOwnProperty(param)) {
                            search.set(param, list.params[param]);
                        }
                    }
                    options.search.setAll(search);
                    return this._http.get("" + this._uri, options)
                        .map(function (res) {
                        list.items = res.json();
                        list.total = Number(res.headers.get('Content-Range').split('/')[1]);
                        list.pages = Math.ceil(list.total / list.size);
                        return list;
                    })
                        .catch(this._observable.error);
                };
                CommentService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, utilities_1.ObservableUtilities, http_1.RequestOptions])
                ], CommentService);
                return CommentService;
            }());
            exports_1("CommentService", CommentService);
        }
    }
});
//# sourceMappingURL=service.js.map