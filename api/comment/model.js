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


    content: {
        type: String,
        required: "comment requires content.",
        trim: true
    },

    keywords: {
        type: [String],
        trim: true
    },
    language: {
        type: String,
        required: 'Article requires a language.'
    },
    translations: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }]

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

CommentSchema.path('language').set(language => _.includes(['en', 'fr'], language) ? language : 'ro');


module.exports = mongoose.model('Comment', CommentSchema);
