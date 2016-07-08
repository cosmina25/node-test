'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');
//var crypto   = require('crypto');

var config   = require('../../config/config');
var coe      = require('../../modules/co-express');

var Comment  = require('./model');
var User     = require('../user/model');
var Badge     = require('../badge/model');

module.exports = {

    /**
     * Creates a new Comment in the DB.
     */
    create: coe(function *(req, res) {
        if (!req.user)
            return res.status(401).send("Not authenticated");

       let comment = yield Comment.create(_.assign(sanitizeComment(req.body), { user: req.user._id })); // 'curata' emailul de scripturi

        // comment = yield Comment.populate(article, {path: 'user'});


        res.location(`/api/comment/${comment._id}`).status(201).json(comment);
    }),

    /**
     * Get a single Comment
     */
    retrieve: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let comment = yield Comment.findById( req.params.id );

        if (!comment)
            return res.status(404).end();
        
        res.json(comment);
    }),
    /**
     * Updates an existing Comment in the DB.
     */
    update: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let comment = yield Comment.findByIdAndUpdate(req.params.id, { $set: sanitizeComment(req.body) }, { lean: true, new: true });

        res.json( comment );
    }),
    /**
     * Retrieve Comments in Range; search by content; sort by date created
     */
    retrieveRange: coe(function *(req, res) {
        let query = {};

        if (req.query.content)
            query.content = { $regex: req.query.content, $options: 'i' }; 

        // get only articles visible for non authors/moderators/admins(by default)
        //if (!req.user || _.isEmpty(_.intersection((yield User.findById(req.user._id, null, { lean: true })).roles, ['moderator', 'author'])))
            //query.approved = true;

        let range = parseRange(req.headers['range']);

        let comments = yield Comment.find(query, '-votes', { lean: true, skip: range.skip, limit: range.limit, sort: '-created'  });
        let count    = yield Comment.count(query);

        for (let comment of comments) {
            comment.badges = yield Badge.find({ comment: comment._id }, null, { lean: true });
        }

        res.set("Accept-Ranges", 'comments');

        if (count && _.isEmpty(comments)) {
            res.set("Content-Range", `comments */${count}`);
            return res.status(416).end();
        }

        res.set("Content-Range", `comments ${range.skip}-${range.skip + range.limit}/${count}`);

        res.status(206).json( comments );
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
        content: sanitize(comment.content, {allowedTags: sanitize.defaults.allowedTags.concat(['img'])})
    });
}
function parseRange(range) {
    const MAX_PER_PAGE = 100;
    const DEFAULT_PER_PAGE = 10;

    let skip = 0;
    let limit = DEFAULT_PER_PAGE;
    if (range) {
        range = range.split('=')[1].split('-');
        if (range[0])
            skip = range[0] * 1; // make it a number

        let requestedLimit = range[1] - skip;
        if (requestedLimit <= MAX_PER_PAGE && requestedLimit > 0)
            limit = requestedLimit;
    }

    return {
        skip: skip,
        limit: limit
    };
}

//add badge