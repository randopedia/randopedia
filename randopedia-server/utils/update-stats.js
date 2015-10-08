var mongoose = require('mongoose');
var schedule = require('node-schedule');

var Schema = mongoose.Schema;

var connectString = 'mongodb://localhost/randopedia';
var mongoOptions = {};

mongoose.connect(connectString, mongoOptions, function(err, res) {
    if(err) {
        console.log('Could not connect to database');
    } else {
        console.log('Connected to database');
    }
});


var TourSchema = new Schema( {
    elevationGain: Number,
    elevationLoss: Number
});

var StatSchema = new Schema( {
    totalGain : Number,
    totalLoss : Number
});

var tourModel = mongoose.model('tour', TourSchema, 'tour');
var statModel = mongoose.model('stat', StatSchema, 'stat');

var aggregateCallback = function(err, result) {
    mongoose.connection.db.dropCollection('stat', function(err, result) {
        if (err) {
            console.log('could not drop collection: ' + err);
        } else {
            console.log('dropped stats collection');
        }
    });

    if(result) {
        console.log(result);

        var stat = new statModel();
        stat.totalGain = result[0].totalGain;
        stat.totalLoss = result[0].totalLoss;
        stat.save(function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
};

tourModel.aggregate([
    {
        $project : {
            elevationGain : 1,
            elevationLoss : 1
        }
    },
    {
        $group : {
            _id : 'elevationStats',
            totalGain : { $sum : "$elevationGain" },
            totalLoss : { $sum : "$elevationLoss" }
        }
    }], aggregateCallback
);

//var job = schedule.scheduleJob('* * 2 * * *', function() {

//    tourModel.aggregate([
//        { 
//            $project : {
//                tags : 1
//            }
//        },
//        {
//            $unwind : "$tags"
//        },
//        {
//            $group : {
//                _id : "$tags",
//                value : { $sum : 1 }
//            }
//        }, 
//        {
//            $sort : {
//                value : -1
//            }
//        }], aggregateCallback
//   );
//});  

