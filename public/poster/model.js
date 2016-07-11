System.register(['../user/model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_1;
    var Poster;
    return {
        setters:[
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            Poster = (function () {
                function Poster() {
                    this._id = '';
                    this.user = new model_1.User;
                    this.name = '';
                    this.description = '';
                    this.badge = '';
                }
                return Poster;
            }());
            exports_1("Poster", Poster);
        }
    }
});
//# sourceMappingURL=model.js.map