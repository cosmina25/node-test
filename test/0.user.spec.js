'use strict';

var expect   = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

var User    = require(config.root + '/api/user/model');

require('..'); // Start it up

var uri = '/api/user';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['email']
});

describe('User', () => co( function *() {
    // Clear relevant collections
    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    describe(`POST ${uri}`, () => {
        it(`should create a user`, () => co (function *() {
            yield crud.createResource(sample.user);
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve a user`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update a user`, () => co (function *() {
            yield crud.updateResource(sample.user);
        }));
    });

    // Verify authentication first. We're making this user an admin for delete to work (see config/permissions)
    let user = sample.user(3);
    describe(`POST ${uri}/login`, () => {
        it('should authenticate a user', () => co (function *() {
            user.roles = [ 'admin' ];
            yield User.create(user);
            let res = yield request({ uri: `${uri}/signin`, method: 'POST', body: user });

            expect(res.statusCode).to.equal(200, util.errMsg(res, 'body'));
            expect(res.body).to.be.an('object', util.errMsg(res, 'body'));
            expect(res.headers['set-cookie']).to.be.an('array', util.errMsg(JSON.stringify(res.headers), 'Headers'));
            expect(!!util.getJWTCookie(res.headers)).to.equal(true, util.errMsg(res, 'headers'));
            expect(res.body.email).to.equal(user.email, util.errMsg(res, 'body'));
            expect(res.body._id).to.be.a('string', util.errMsg(res, 'body'));
        }));
    });

    // delete the previous user from the CRUD object and finish testing CRUD
    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete a user`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });

    // Other
    describe(`GET ${uri}`, () => {
        it('should retrieve the authenticated user', () => co (function *() {
            let res = yield request({ uri: uri });

            expect(res.statusCode).to.equal(200, util.errMsg(res, 'body'));
            expect(res.body).to.be.an('object', util.errMsg(res, 'body'));
            expect(res.body.email).to.equal(user.email, util.errMsg(res, 'body'));
            expect(res.body._id).to.be.a('string', util.errMsg(res, 'body'));
        }));
    });
}));