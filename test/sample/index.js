'use strict';

var co = require('co');

module.exports = request => {
    let sample = {
        user: inc => ({  //tiparul pe  care trebuie sa-l respecte userul
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
                type: `fa-type-${inc}` // forma badge.ului
            }
        }),
        poster : userId => inc => co(function *() {
            userId =userId || (yield request ({ uri: '/api/user' , method: 'POST' , body: sample.user(inc) })).body._id;
            
            return {
                user: userId,
                name: `Poster${inc}`,
                description: `My description ${inc}`,
                badge: `Special badeg fa-type-${inc}`
            }
            
        })

    };

    return sample;
};
