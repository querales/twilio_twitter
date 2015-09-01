<H1>Twillio_Twitter</H1>

<H2>Synopsis</H2>

<p>This is a very simple node application that takes a twitter handle (no '@'' symbol in the handle) via a Twilio phone number and replies back with the latest tweet from the user which the handle identifies.</p>

<p>For example, the user would text "jeffiel" to get the latest tweet from Jeff Lawson, Twilio's CEO. Jeff Twitter handle is "jeffiel" notice the "@" is not included</p>

<p>
This application dosen't do any Twitter handle validation. This will change in the near future. 
</p>	

<p>The tokens, secret keys, ect for Twilio and Twitter accounts are set via enviroment variable</p>

<H2>Libraries</H2>
<p> I am using the following node client libaries: </p>
<li>Twilio's  https://github.com/twilio/twilio-node</li> 
<li>Twitter's https://www.npmjs.com/package/twitter</li> 


<H2> Author </H2>
<p>Gabriella Querales</p>