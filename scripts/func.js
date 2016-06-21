// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// twitter-social-shares
// Version : 0.0.1
// License: 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++

var config = require('./scripts/config.js');
var Twitter = require('twitter');
var mongoose = require('mongoose');
var twitter_shares = require('./models/twitter_shares')
var Twitter_share = mongoose.model('twitter_share', Twitter_share);

module.exports= {
	"db":  mongoose.connect('mongodb://'+config.DB_HOST+'/'+config.DB_NAME'),
	"client": new Twitter({
		consumer_key: config.TWITTER_COMSUMER_KEY,
		consumer_secret: config.TWITTER_CONSUMER_SECRET,
		bearer_token: config.TWITTER_BEARER_TOKEN
	}),
	"get_tweets_from_keywords": function(keyword, twitter_share, pos, callback){
		// fetch tweets containing the keyword
		var params = {q: keyword};
		this.client.get('search/tweets.json', params, function(error, tweets, response){
			if (!error) {
				console.log(tweets);
			}
			//for each, index the tweets data
			var x=1
			for (var status in tweets.statuses) {
				var tweets_data = {
					"url": '/'+ status.user.name+'/'+status.id,
					"text": status.text,
					"retweet" : status.retweet_count
				}
				// concatenate to main keyword twitter_share object
				twitter_share.tweets.push(tweets_data)
				// count up the total_share score
				twitter_share.total_shares += tweets_data.retweet
				// index in mongoDb and when finalized , send back the main twitter_share object na dposition for _finalize
				this.index_tweets(twitter_share, function(){
					x=x+1
					if (x == tweets.statuses.length){
						callback(twitter_share, pos)
					}
					})
			}
			
		});
		
	},
	"index_tweets": function(twitter_share, callback){
		var instance = new Twitter_share();
		instance = twitter_share;
		instance.save(function (err) { 
			callback()
		});
	},
	"get_Twitter_social_shares": function(keywords, callback){
		// Taking a list of keywords and fetch tweet related to theses and then a count of retweet. 
		// tweets related to keyword will be indexed in a mongoDb collections by date. 
		// The nb of share will serves as history (fetching past data may be harder or limited)
		
		// 2. then, for each tweets containing the keyword, fetch the number of times it was shared.
		//(may need to add an evaluation method for analysing where the keyword is in the tweet;ex:title hashtag or content)
		
		// Finally send back an array of total_shaes value for keywords
		var final = new Array(keywords.length)
		var _finalize =  function(twitter_share, pos){
			final[pos] = twitter_share.total_shares
			var pass =  true
			for (var y = 0; y < final.length; y++) {
				// if all array indexe are not filled continue else send the final array of total_shares
				 if (isNaN(final[y]) || final[y] == undefined || final[y] == null ){
					 pass = false
				}
				if(y == (final.length-1) && pass = true){
						 callback(final)
					 }
			}
		}
		
		// 1. Get all tweets related to each keyword
		for (var i = 0; i < keywords.length; i++) { 
			// Initializing the mongoDb collection object for twitter shares per topic.
			var twitter_share = {
				"timestamp": new Date(),
				"topic": keywords[i],
				"total_shares": -1,
				"tweets":[]
			}
			this.get_tweets_from_keywords(keywords[i], twitter_share, i, _finalize)
		}
	}
};
