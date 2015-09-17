var lastTweet;

var Twitter = require('twitter');

// If undefined in our process load our local file
// (i.e. we aren't on an external server where we set these differently)
if(!process.env.TWITTER_CONSUMER_KEY) {
  var env = require('./env.js')
}
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// this function gets the last tweet for the handle passed in the parm
exports.getTweet = function getTweet (handle,setMessg){
//this line bellow is to test. commenedted the line above need to uncoment the above line to runnormal
//function getTweet (handle,setMessg){	
client.get('users/lookup.json', {screen_name:handle}, function(error,tweet,response){
	   if (error)
	   {
		 	console.log ("error "+error)
		 	return;
	   }	 
	   else
	   {	
		  // console.log("type "+typeof (tweet));  
		  console.log(tweet[0].status.text);
		  lastTweet =tweet[0].status.text;
		  setMessg(lastTweet);
	   }
	})
};

//getTweet ("levie")
