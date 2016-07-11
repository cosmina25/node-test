'use strict';

var expect   = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

//var Poster = require(config.root + '/api/poster/model');

require('..'); // Start it up

var uri = '/api/poster';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['user', 'name', 'description' , 'badge']
});

describe('Poster', function () {
    this.timeout(10000);

    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));     // sterg user+comment din baza de date 
        yield new Promise(resolve => mongoose.connection.collections['comments'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['badges'].drop(resolve));   //plural
        yield new Promise(resolve => mongoose.connection.collections['posters'].drop(resolve));
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    let res;
    describe(`POST ${uri}`, () => {
        it(`should create a poster`, () => co (function *() {
            res = yield crud.createResource(sample.poster()); //asteapta sa creeze resursa -> raspuns din sample.badge
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve a poster`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update a poster`, () => co (function *() {
            yield crud.updateResource(sample.poster(res.body.user));
        }));
    });

    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete a poster`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });
});