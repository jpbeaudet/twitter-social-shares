var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Twitter_share = new Schema({
	
	timestamp : Date,
	topic: String,
	total_shares: Number,
	tweets: Array
	
	});

module.exports = mongoose.model('twitter_share', Twitter_share);
