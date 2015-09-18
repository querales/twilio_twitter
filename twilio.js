// appdynamics agent

require("appdynamics").profile({
    controllerHostName: 'paid138.saas.appdynamics.com',
    controllerPort: 80, // If SSL, be sure to enable the next line     controllerSslEnabled: true // Optional - use if connecting to controller via SSL  
    accountName: 'BringIT',
    accountAccessKey: '2tljw7jnvndg',
    applicationName: 'twitter_twilio',
    tierName: 'MyTwitterApp',
    nodeName: 'twilio' // The controller will automatically append the node name with a unique number
});

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

app.post('/',twilio.webhook({url:"https://serene-refuge-2462.herokuapp.com/"}),    
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
                     console.log ("the tweet to send is "+tweet); 
                     twiml.message("The last tweet for @" +request.body.Body + "was "+tweet);
                     response.send(twiml);
                    });
                }
            });



//---
// to test 
//----
 //  myTwitter.getTweet ("levie", function (tweet){
   //                 console.log ("the tweet to send is "+tweet); })

//----

// Start an HTTP server with this Express app
app.get('/', function(request, response) {
    response.send("Hello!!!! This would be some HTML");
});

 // Make our Express server listen on port 5000.
app.listen(process.env.PORT || 5000);