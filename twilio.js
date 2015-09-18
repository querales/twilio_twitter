if(!process.env.TWILIO_ACCOUNT_SID) {
  var env = require('./env.js')
}


// Load configuration information from system environment variables.
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_URL = process.env.TWILIO_URL 
    ;

//open source modules
var express = require('express'),
    twilio = require('twilio'),
    app = express(),
    bodyParser = require('body-parser');

// my modules
var myTwitter =require ('./myTwitter')     


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Reads the request, gets the handle, calls getTweet function in myTwitter module 
// gets the last tweet for the handle and send it to the user
app.post('/',twilio.webhook({url:TWILIO_URL}), 
         function(request, response) {
                console.log ("phone number 2*"+ request.body.From);
                var twiml = new twilio.TwimlResponse();
                if (request.body.Body == "*"){
                    twiml.message("Error!! you dind't send us a valid Twitter handle");
                    response.send(twiml);   
                }  
                else { 
                    console.log ("phone number 2 "+ request.body.From);
                    myTwitter.getTweet (request.body.Body, function (tweet){
                    console.log ("the tweet to send is "+request.body.Body); 
                    twiml.message("The last tweet for @" +request.body.Body + "was "+tweet);
                    response.send(twiml);
                    });
                }
            });

// Start an HTTP server with this Express app
app.get('/', function(request, response) {
    response.send("Hello!!!! This would be some HTML");
});

 // Make our Express server listen on port 5000.
app.listen(process.env.PORT || 5000);