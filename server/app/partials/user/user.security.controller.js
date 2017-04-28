

var moduleName = 'user.security.controller';
var userDataModel = requireFile('app/partials/user/user.model.js');
var errHandler = requireFile('app/error/errorHandler.js')(moduleName);
var error = errHandler.customError;
var errorType = errHandler.errorType;

module.exports = {
    authenticate: authenticate
};

function authenticate(req, res, next) {


    try {
        if (req.body.EmailId === undefined || req.body.EmailId === '') {
            next(error(errorType.emailIdNotExists));
        }

        userDataModel.findOne({ 'EmailId': req.body.EmailId })
            .then(function (data) {
                if (data) {
                    // if (data.Password === req.body.Password) res.send(data);  //password not authenticated 
                    res.send(data);
                } else {
                    var err = errorType.dataNotFound;
                    return next(error(err));
                }
            })
            .catch(function (err) {
                return next(error(err));
            });
    }
    catch (err) {
        return next(error(err));
    }




}






