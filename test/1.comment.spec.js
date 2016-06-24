'use strict';

var expect   = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

var Comment    = require(config.root + '/api/comment/model');

require('..'); // Start it up

var uri = '/api/comment';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['user', 'content']
});

describe('Comment', () => {
    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['comments'].drop(resolve));
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    let res;
    describe(`POST ${uri}`, () => {
        it(`should create a comment`, () => co (function *() {
            res = yield crud.createResource(sample.comment());
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve an comment`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update an comment`, () => co (function *() {
            yield crud.updateResource(sample.comment(res.body.user));
        }));
    });

    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete an comment`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });

    // Other

    // Collection
    describe(`GET ${uri}`, () => {
        it(`should retrieve a range of comments`, () => co (function *() {
            yield crud.retrieveRange(inc => co (function *() {
                return (yield request({ uri: uri, method: 'POST', body: yield sample.comment()(inc) })).body;
            }), 'comments');
        }));
    });

});