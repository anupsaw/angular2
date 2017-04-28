
module.exports = appRouter;
var express = require('express')();

// This will work as routing for this application
var user = requireFile('app/partials/user/user.route.js');
var home = requireFile('app/partials/home/home.route.js');

function appRouter() {
    express.use('/home', home);
    express.use('/user', user);
    return express;

}




