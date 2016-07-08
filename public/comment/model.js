System.register(['../common/classes', '../user/model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var classes_1, model_1;
    var Comment, CommentList;
    return {
        setters:[
            function (classes_1_1) {
                classes_1 = classes_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            Comment = (function () {
                function Comment() {
                    this._id = '';
                    this.user = new model_1.User;
                    this.content = '';
                    this.badges = [];
                }
                return Comment;
            }());
            exports_1("Comment", Comment);
            CommentList = (function (_super) {
                __extends(CommentList, _super);
                function CommentList() {
                    _super.apply(this, arguments);
                }
                return CommentList;
            }(classes_1.List));
            exports_1("CommentList", CommentList);
        }
    }
});
//# sourceMappingURL=model.js.map