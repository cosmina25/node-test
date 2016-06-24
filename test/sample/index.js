'use strict';

var co = require('co');

module.exports = request => {
    let sample = {
        user: inc => ({
            email: `user${inc}@domain.com`,
            password: 'password'
        }),
        comment: userId => inc => co(function *() {
            userId = userId || (yield request({ uri: '/api/user', method: 'POST', body: sample.user(inc) })).body._id;

            return {
                user: userId,
                content: `My fantastic comment!`
            };
        })
    };

    return sample;
};
