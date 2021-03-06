'use strict';
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var _         = require('lodash');


var BadgeSchema = new Schema ({
    user: {
        type : Schema.ObjectId,
        ref : 'User' ,
        required : "badge requires a user id"
        
    },
    type : {
        type: String,
        required : "badge requires a type "
    },
     comment: {
         type : Schema.ObjectId,
         ref : 'Comment',
         required : "badge requires a comment"
     }

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Badge', BadgeSchema);