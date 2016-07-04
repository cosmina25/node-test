'use strict';

var expect   = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

//var Badge = require(config.root + '/api/badge/model');

require('..'); // Start it up

var uri = '/api/badge';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['user', 'comment', 'type']
});

describe('Badge', function () {
    this.timeout(10000);

    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));     // sterg user+comment din baza de date 
        yield new Promise(resolve => mongoose.connection.collections['comments'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['badges'].drop(resolve));   //plural
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    let res;
    describe(`POST ${uri}`, () => {
        it(`should create a badge`, () => co (function *() {
            res = yield crud.createResource(sample.badge()); //asteapta sa creeze resursa -> raspuns din sample.badge
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve a badge`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update a badge`, () => co (function *() {
            yield crud.updateResource(sample.badge(res.body.user, res.body.comment));
        }));
    });

    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete a badge`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });
});