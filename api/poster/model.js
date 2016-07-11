'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var _        = require('lodash');

var PosterSchema = new Schema ( {
    
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: "Poster requires a user (id)."
    },
    name:        {
        type: String,
        required: "Poster requires a name."
    },
    description: {
        type: String,
        required: "Poster requires a description."
    },
    badge: {
        type: String,
        required:" Poster requires a badge"
    }
    
},{ timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Poster', PosterSchema);