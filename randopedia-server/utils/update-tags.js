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

var TagSchema = new Schema( {
    tag : String,
    value : Number,
    popularity : Number,
    name : String
});

var TourSchema = new Schema( {
    name: String
});

var tagModel = mongoose.model('tag', TagSchema, 'tag');

var tourModel = mongoose.model('tour', TourSchema, 'tour');

var aggregateCallback = function(err, result) {
    mongoose.connection.db.dropCollection('tag', function(err, result) {
        if (err) {
            console.log('could not drop collection: ' + err);
        } else {
            console.log('dropped tags collection');
        }
    });

    if(result) {
        var maxValue = result[0].value;
        
        var values = result.map(function(tag) {
            var fraction = parseFloat(tag.value / maxValue);
            tag.popularity = Math.floor(fraction * 5);
            return tag;
        });
        
        values.forEach(function(value) {
            var tag = new tagModel();
            tag.tag = value._id;
            tag.popularity = value.popularity;
            tag.value = value.value;
            tag.name = value._id;
            tag.save(function(err) {
                if(err) {
                    console.log('Error saving tag: ' + err);
                }
            });
            console.log('updated tag: ' + tag.name);
        });
    }
};

//var job = schedule.scheduleJob('* * 2 * * *', function() {

    tourModel.aggregate([
        { 
            $project : {
                tags : 1
            }
        },
        {
            $unwind : "$tags"
        },
        {
            $group : {
                _id : "$tags",
                value : { $sum : 1 }
            }
        }, 
        {
            $sort : {
                value : -1
            }
        }], aggregateCallback
   );
//});  

