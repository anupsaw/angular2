
module.exports = errorHandler;

var errorType = requireFile('app/error/errorCode.js');
var moduleName;

function errorHandler(moduleName) {
    moduleName = moduleName;
    return {
        errorType: errorType,
        customError: customError
    };
}


function customError(err, code, status) {
    return new CustomError(err, code, status);
}


function CustomError(err, code, status) {
    Error.call(this);
    this.stack = err.stack || Error.captureStackTrace(this);
    this.message = err.message;
    this.status = err.status || status;
    this.code = code || err.code || 'U0000';
    this.module = moduleName;
    this.timestamp = Date.now();
    this.name = 'CustomError';
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;






// function handleError(resObj, statusCode, errorObj) {
//     resObj.status(statusCode).send(errorObj);
// }


// function bindErrorObject(err, modulename) {
//     err.modulename = modulename;
//     return new ErrorObject(err);
// }

// function bindCustomErrorObject(code, errmsg, modulename) {
//     return new ErrorObject({ code: code, errmsg: errmsg, modulename: modulename });
// }

// function ErrorObject(err) {
//     this.code = err.code;
//     this.errmsg = err.errmsg;
//     this.name = err.name || 'application';
//     this.modulename = err.modulename;
//     this.timestamp = Date.now();
// }

// function checkForError(res, err,modulename) {
//     if (err) handleError(res, 409, bindErrorObject(err, modulename));
// }

// function bindAndSendErrResponse(res, code, modulename) {
//     var errmsg = errorCodeInfo(code);
//     var errObj = bindCustomErrorObject(code, errmsg, modulename);
//     handleError(res, 400, errObj);
// }


