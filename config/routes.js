'use strict';

var sanitize   = require('sanitize-html');
var jwt        = require('jsonwebtoken');

var config = require('./config');

module.exports = function (app, express) {
    app.all('/*', addUser); // Add authenticated user to req

    app.use('/api/user', require(config.root + '/api/user')(express));
    app.use('/api/comment', require(config.root + '/api/comment')(express));
    app.use('/api/badge' , require(config.root + '/api/badge') (express));
    app.use('/api/poster' , require(config.root + '/api/poster') (express));
    
    app.get('/*', (req, res) => res.sendFile(config.root + '/public/index.html'));

    app.all('/*', (req, res) => res.status(404).send('Route not found')); //apare alerta in cazul in care este gresita ruta
};

function addUser(req, res, next) {
    jwt.verify(req.cookies['jwt'], config.session_secret, function(err, user) {
        req.user = user;
        next();
    });
} //verifica daca jwt.ul este acelasi cu config.session_secret si pune user in req.user
