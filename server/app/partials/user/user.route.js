'use strict';

// This will work as routing for this application
var express = require('express');
var router = express.Router();

var login = requireFile('app/partials/user/user.login.controller.js');
var signup = requireFile('app/partials/user/user.signup.controller.js');
var profile = requireFile('app/partials/user/user.profile.controller.js');
var security = requireFile('app/partials/user/user.security.controller.js');


//function useRouter() {
router.use(function (req, res, next) {
    console.log('I am here in user.route.js page');
    next();
});

router.route('/')
    .get(function (req, res) {
        console.log(req);
        res.send('user.get');
    });

router.route('/login')
    .post(login.authenticate);

router.route('/signup')
    .get(signup.getUserModel)
    .post(signup.registerUser);


router.route('/profile/:id')
    .get(profile.getUserInfo)
    .put(profile.updateUser);

router.route('/security/:id')
    .get(profile.getUserInfo)
    .put(profile.updateUser);


router.route('/signup/checkemail')
    .post(signup.checkEmail);



// return router
//}
module.exports = router;