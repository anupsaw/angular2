'use strict';

// This will work as routing for this application
var express = require('express');
var router = express.Router();


router.use(function (req, res, next) {
    console.log('I am here in home.route.js page');
    next();
});

router
    .get('/', function (req, res) {
        console.log(req);
        res.send('anup2');
    });

module.exports = router;