'use strict';

var co = require('co');

module.exports = request => {
    let sample = {
        user: inc => ({
            email: `user${inc}@domain.com`,
            password: 'password'
        }),
        comment: userId => inc => co(function *() {
            userId = userId || (yield request({ uri: '/api/user', method: 'POST', body: sample.user(inc) })).body._id; // creeaza un user

            return {
                user: userId,
                content: `My fantastic comment!`
            };
        }),
        badge : (userId , commentId) => inc => co(function *() {
            userId =userId || ( yield request({ uri: '/api/user', method: 'POST' , body: sample.user(inc) })).body._id;
            commentId =commentId || ( yield request({ uri: '/api/comment', method: 'POST', body: sample.comment(inc) })).body._id;

            return {
                user: userId,
                comment: commentId,
                type: `fs-type-${inc}`
            }
        })

    };

    return sample;
};
