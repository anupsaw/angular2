
var errHandler = requireFile('app/error/errorHandler.js')('user.model');
var error = errHandler.customError;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;


var UserSchema = new Schema({

    UserId: {
        type: Number,
        trim: true,
        required: true,
        default: 10000,
        unique: true
    },
    FirstName: {
        type: String,
        trim: true,
        default: '',
        config: {
            bindToView: true,
            element: 'input',
            type: 'text'
        }
    },
    LastName: {
        type: String,
        trim: true,
        default: '',
        config: {
            bindToView: true,
            element: 'input',
            type: 'text'
        }
    },
    EmailId: {
        type: String,
        trim: true,
        default: '',
        unique: true,
        index: true,
        required: true,
        config: {
            bindToView: true,
            element: 'input',
            type: 'email'
        }

    },
    CreateDate: {
        type: Date,
        default: Date.now()
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        config: {
            bindToView: true,
            element: 'input',
            type: 'text'
        }
    },
    CellNumber: {
        type: String,
        required: false,
        default: '',
        trim: false,
        config: {
            bindToView: true,
            element: 'input',
            type: 'text'
        }
    },
    BirthDate: {
        type: Date,
        required: false,
        trim: false,
        default: null,
        config: {
            bindToView: true,
            element: 'input',
            type: 'text'
        }
    }


});


var userIdSchema = new Schema({
    UserId: {
        type: Number,
        trim: true,
        required: true,
        default: 10000,
        unique: true
    }
});



function getNewUserId() {
    var useIdModel = mongoose.model('userIds', userIdSchema);
    useIdModel.findOne(function (err, val) {
        if (err) return (error(err));
        if (val === null) {
            var userId = new useIdModel();
            return userId.save();
        }


        val.UserId = val.UserId + 1;
        return val.update();

    });
}

UserSchema.methods.getNewId = function () {
    var count;
    this.model('users').count(function (err, count) {
        count = count;
    });
    var NewId;
    this.model('users').findOneAndUpdate({}, { UserId: count + 1 }, function (err, id) {
        if (err) return err;
        NewId = id;
    });
    return NewId;
};


module.exports = mongoose.model('users', UserSchema);