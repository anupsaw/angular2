

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;


var UserSchema = new Schema({

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

module.exports = mongoose.model('users', UserSchema);