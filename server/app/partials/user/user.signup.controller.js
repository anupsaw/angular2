var moduleName = 'user.signup.controller';
var userDataModel = requireFile('app/partials/user/user.model.js');
var errHandler = requireFile('app/error/errorHandler.js')(moduleName);
var error = errHandler.customError;
var errorType = errHandler.errorType;


module.exports = {
    registerUser: registerUser,
    checkEmail: checkEmail,
    getUserModel: getUserModel
};


function registerUser(req, res, next) {
    var hasValue;
    var User = new userDataModel();

    hasValue = buildModelObject(User, req.body, next);
    if (hasValue) {
        userDataModel.count(function (err, count) {
            if (err) return next(error(err));
            User.UserId = User.UserId + count;
            User.save(function (err, saveObj) {
                if (err) return next(error(err));
                res.send(saveObj);
            });
        });

    } else {
        return next(error(errorType.dataNotFound));
    }

}



function checkEmail(req, res, next) {
    userDataModel.findOne({ 'EmailId': req.body.EmailId }, function (err, foundEmail) {
        if (err) return next(error(err));
        var returnObj = foundEmail ? false : true;
        res.send(returnObj);
    });

}

function getUserModel(req, res, next) {
    res.send(userDataModel.schema.tree);
}


function buildModelObject(schemObj, reqBody, next) {

    try {
        var hasValue = false;
        for (var prop in reqBody) {
            schemObj[prop] = reqBody[prop];
            hasValue = true;
        }
        return hasValue;
    } catch (err) {

        return next(error(err));
    }
}
