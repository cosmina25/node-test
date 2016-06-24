'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var _         = require('lodash');

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: "comment requires a user (id)."
    },
    content: {
        type: String,
        required: "comment requires content.",
        trim: true
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });


module.exports = mongoose.model('Comment', CommentSchema);
