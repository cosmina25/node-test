System.register(['../user/model', '../comment/model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_1, model_2;
    var Badge;
    return {
        setters:[
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (model_2_1) {
                model_2 = model_2_1;
            }],
        execute: function() {
            Badge = (function () {
                function Badge(comment, type) {
                    this._id = '';
                    this.user = new model_1.User;
                    this.comment = comment || new model_2.Comment;
                    this.type = type || '';
                }
                return Badge;
            }());
            exports_1("Badge", Badge);
        }
    }
});
//# sourceMappingURL=model.js.map