'use strict';

var path = require('path');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    root: path.normalize(__dirname + '/..'),
    port: process.env.SCOUTSOCIETY_PORT || 3004,
    ip: process.env.IP || null,
    mongodb: {
        uri: process.env.NODE_ENV === 'test' ?
            'mongodb://localhost/node-test-test' :
            (process.env.SCOUTSOCIETY_MONGODB || 'mongodb://localhost/node-test'),
        options: {
            db: {
                safe: true
            }
        }
    },
    session_secret: process.env.SESSION_SECRET || 'mysecretsession'
};
