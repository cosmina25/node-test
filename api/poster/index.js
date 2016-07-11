'use strict';

var poster = require ('./controller');

module.exports = express => {
    let router = express.Router();

    //CRUD
    router.post   ('/',     poster.create);
    router.get    ('/:id?', poster.retrieve);
    router.put    ('/:id',  poster.update);
    router.delete ('/:id',  poster.delete);

    return router;

};
