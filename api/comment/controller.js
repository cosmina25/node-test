'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');
var crypto   = require('crypto');

var config   = require('../../config/config');
var coe      = require('../../modules/co-express');

var Comment  = require('./model');
var User     = require('../user/model');

module.exports = {

    /**
     * Creates a new Comment in the DB.
     */
    create: coe(function *(req, res) {
        if (!req.user)
            return res.status(401).send("Not authenticated");

        let user = yield User.findOne({user: req.user._id}, null, {lean: true});

        if (!user)
            return res.status(401).send("Not an author");

        let comment = yield Comment.create(_.assign(sanitizeComment(req.body), {user: user._id}));

        comment = (yield Comment.populate(article, {path: 'user'})).toObject();


        res.location(`/api/comment/${comment._id}`).status(201).json(comment);
    }),


    /**
     * Deletes a Comment from the DB.
     */
    delete: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        yield Comment.findByIdAndRemove(req.params.id);

        res.status(204).end();
    })
};
    
function sanitizeComment(comment) {
    return _.pickBy({
        content:     sanitize(comment.content, { allowedTags: sanitize.defaults.allowedTags.concat(['img']) }),
        keywords:    _.map(comment.keywords, sanitize),
        language:    sanitize(article.language)
    });
}
