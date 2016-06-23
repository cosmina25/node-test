'use strict';

var co = require('co');

module.exports = request => {
    let sample = {
        user: inc => ({
            email: `user${inc}@domain.com`,
            password: 'password'
        }),
        author: userId => inc => co(function *() {
            userId = userId || (yield request({ uri: '/api/user', method: 'POST', body: sample.user(inc) })).body._id;

            return {
                user: userId,
                name: `Author${inc}`,
                description: `My description ${inc}`,
                status: `Staff ${inc}`,
                image: `http://lorempixel.com/400/400/?no=${inc}`,
                website: `http://domain${inc}.ro`,
                facebook: `https://www.facebook.com/funky-name${inc}`
            };
        })
    };

    return sample;
};
