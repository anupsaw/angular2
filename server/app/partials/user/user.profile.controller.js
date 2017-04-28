
var moduleName = 'user.profile.controller';
//var userDataModel = requireFile('app/partials/user/user.model.js');
var errHandler = requireFile('app/error/errorHandler.js')(moduleName);
var error = errHandler.customError;
var errorType = errHandler.errorType;


module.exports = {
    updateUser: updateUser,
    getUserInfo: getUserInfo

};

function updateUser(req, res, next) {
    var id = req.params.id;
    userDataModel.findOne({ UserId: id })
        .then(processData)
        .then(sendResponse)
        .catch(function (err) {
            return next(error(err));
        });


    function processData(data) {
        if (!data) return next(error(errorType.dataNotFound));

        var hasData = buildModelObject(data, req.body);
        if (hasData) {
            return data.save();
        } else {
            return next(error(errorType.dataProcessingError));
        }

    }

    function sendResponse(resData) {
        res.send(resData);
    }


    function buildModelObject(schemObj, reqBody) {
        try {
            var hasValue = false;
            for (var prop in reqBody) {
                schemObj[prop] = reqBody[prop];
                hasValue = true;
            }
            return hasValue;
        }
        catch (err) {
            return next(error(err));
        }
    }

}

function getUserInfo(req, res, next) {
    var id = req.params.id;
    userDataModel.findOne({ UserId: id }, function (err, data) {
        if (err) return next(error(err));

        if (data) {
            res.send(data);
        } else {
            return next(error(errorType.dataNotFound));
        }
    });

}






