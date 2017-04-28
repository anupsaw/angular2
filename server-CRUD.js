

var express = require('express')
var router = express.Router();

var dbConnection = 'mongodb://127.0.0.1:27017/test'
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var ObjectId = require('mongodb').ObjectID;

var DB = { insert: 1, update: 2, delete: 3, get: 4 }

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    //console.log(req);
    next()

})
// define the home page route
router.get('/:entity/:id', function (req, res) {

    dbOperation(DB.get, req.params.entity, req.params.id, null, callback);

    function callback(data) {
        res.send(data);
    }

})

router.get('/:entity', function (req, res) {
    function callback(data) {
        res.send(data);
    }
    dbOperation(DB.get, req.params.entity, null, null, callback);

})
// define the about route
router.post('/:entity', function (req, res) {
    dbOperation(DB.insert, req.params.entity, req.params.id, req.body, callback);
    function callback(data) {
        res.send(data);
    }
})

router.put('/:entity/:id', function (req, res) {
    dbOperation(DB.update, req.params.entity, req.params.id, req.body, callback);
    function callback(data) {
        res.send(data);
    }
})

router.delete('/:entity/:id', function (req, res) {
    dbOperation(DB.delete, req.params.entity, req.params.id, null, callback);
    function callback(data) {
        res.send(data);
    }
})


function dbOperation(execType, entity, id, data, callbacks) {
    var response;
    console.log(entity);
    MongoClient.connect(dbConnection, function (err, db) {
        if (err) {
            throw err;
        } else {
            console.log("successfully connected to the database");

            try {
                var _id;
                if (DB.insert === execType) {
                    response = db.collection(entity).insertOne(data, function (err, res) {
                        console.log(res.ops[0]);
                        if (err) throw err;
                        callbacks(res.ops[0]);
                    });
                    console.log("Data inserted successfully");
                }
                if (DB.get === execType && id == null) {
                    response = db.collection(entity).find().toArray(function (err, items) {
                        if (err) throw err;
                        console.log(items);
                        callbacks(items);
                    });;
                    console.log("Data retrieved successfully");
                }
                if (DB.get === execType && id !== null) {
                    _id = ObjectId.createFromHexString(id);
                    response = db.collection(entity).findOne({ _id: _id }, function (err, items) {
                        if (err) throw err;
                        console.log(items);
                        callbacks(items);
                    });
                    console.log("Data retrieved by id successfully");
                }
                if (DB.update === execType) {
                    _id = ObjectId.createFromHexString(id);
                    // response = db.collection(entity).findAndModify({
                    //     query: { _id: _id },
                    //     update: data,
                    //     upsert: true
                    // }, function (err, items) {
                    //     console.log(items);
                    //     if (err) throw err;
                    //     callbacks(items);
                    // });

                    response = db.collection(entity).update({ _id: _id }, {
                        $set: data,
                        $currentDate: { "lastModified": true }
                    }, function (err, items) {
                        console.log(items);
                        if (err) throw err;
                        callbacks(items);
                    });
                    console.log("Data updated successfully");
                }
                if (DB.delete === execType) {
                    _id = ObjectId.createFromHexString(id);
                    response = db.collection(entity).remove({ _id: _id }, function (err, items) {
                        console.log(items);
                        if (err) throw err;
                        if (items.result) {
                            callbacks(true);
                        } else {
                            throw { message: "Some error has occurred. Data is not deleted. Please try again later" };
                        }

                    });
                    console.log("Data deleted successfully");
                }
            } catch (error) {
                console.log(error);
                callbacks(error.message);
            }
            // app = requireFile('index.js')(app, db);
        }
        console.log(" I am closed");

        // callBacks(data);
        db.close();
    });



}



module.exports = router;
