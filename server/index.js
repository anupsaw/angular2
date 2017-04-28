'use strict';

module.exports = main;

//require module
var bodyParser = require('body-parser');
var router = require('./app/route/app.route.js')();
var errHandler = requireFile('app/error/errorHandler.js');
// export module
function main(app, db) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(router);


    //this should alwasy be last;
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });


    return app;

}