'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');

var coe      = require('../../modules/co-express');

var Poster  = require('./model');
var User     = require('../user/model');

module.exports = {

    /**
     * Creates a new Poster in the DB.
     */
    create: coe(function *(req, res) {
        if (!req.user)
            return res.status(401).send("Not authenticated");

        if (yield Poster.findOne({ user: req.user._id }, null, { lean: true }))
            return res.status(400).send("Already a poster ");

        let poster = yield Poster.create(_.assign(sanitizePoster(req.body), { user: req.user._id }));

        yield User.findByIdAndUpdate(req.user._id, { $push: { roles: 'poster' } }, { lean: true });

        res.location(`/api/poster/${poster._id}`).status(201).json(poster);
    }),

    /**
     * Get a single Poster
     */
    retrieve: coe(function *(req, res) {
        let id = req.params.id || (req.user ? req.user._id : null);

        if (!id)
            return res.status(400).send('ID required');

        let poster = yield Poster.findOne({ $or: [{ user: id }, { _id: id }]}, null, { lean: true });

        if (!poster)
            return res.status(404).end();

        res.json(poster);
    }),

    /**
     * Updates an existing Poster in the DB.
     */
    update: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let poster = yield Poster.findByIdAndUpdate(req.params.id, { $set: sanitizePoster(req.body) }, { lean: true, new: true });

        res.json(poster);
    }),

    /**
     * Delete an Poster from the DB.
     */
    delete: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        yield Poster.findByIdAndRemove(req.params.id);

        res.status(204).end();
    }),

    /**
     * Get list of Posters
     */
    list: coe(function *(req, res) {
        let posters = yield Poster.find({}, null, { lean: true });

        res.json(posters);
    })
};

function sanitizePoster(poster) {

    _.map(poster, (value, property) => poster[property] = _.trim(value));

    poster = _.pickBy({
        name: sanitize(poster.name),
        description: sanitize(poster.description),
        badge : sanitize(poster.badge)

    })

    return poster;
}

