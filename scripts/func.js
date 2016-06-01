// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// twitter-social-shares
// Version : 0.0.1
// License: 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
var config = require('./scripts/config.js');
var Twitter = require('twitter');

module.exports= {
	"client": new Twitter({
		consumer_key: config.TWITTER_COMSUMER_KEY,
		consumer_secret: config.TWITTER_CONSUMER_SECRET,
		bearer_token: config.TWITTER_BEARER_TOKEN
	}),
	"get_social_shares": function(args, callback){
		var params = {q: '%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4'};
		this.client.get('search/tweets.json', params, function(error, tweets, response){
			if (!error) {
				console.log(tweets);
			}
		});
		callback(tweets)
	},
	"get_article_title_with_keywords":function(args, callback){
		callback(args)
	}
};
