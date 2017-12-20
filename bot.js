

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);


// Does not retweet with extra "q". Takes second q and searches with that, ignores first q.
// Does not retweet with && between two quoted parameters on one q. Or without && between them.

var retweet = function() {
  var params = {
    q: "@NYCRaves",
    status: 'RT & win',
    lang: 'en',   
  };

 T.get('search/tweets', params, 
	function(err, data) {
        
        if (!err) {
            
            var retweetId = data.statuses[0].id_str;
            	
            	//console.log(retweetId) the ID is just a set of random? numbers associated with the individual tweet;
            
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!');
                }
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

retweet();


setInterval(retweet, Math.floor(Math.random() * (60*60*1000)));