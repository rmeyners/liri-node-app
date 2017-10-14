var keys = require("./keys");

var request = require("request");

var fs = require("fs");

var spotifyKeys = keys.spotify;
var twitterKeys = keys.twitter;

var command = process.argv[2];

var searchTerm = "";

var searchArray = process.argv;

verifyCommand();

function verifyCommand (){
	switch (command){
		case "my-tweets":
		twitter();
		break;

		case "spotify-this-song":
		createSearch();
		spotify();
		break;

		case "movie-this":
		createSearch();
		omdb();
		break;

		case "do-what-it-says":
		doWhatItSays();
		break;
	}
}


function createSearch () {
	if(command === "spotify-this-song") {
		if(searchArray.length > 3) {
			for (var i = 3; i < searchArray.length; i++){
				searchTerm += searchArray[i] +" "
			}
		} else {
			searchTerm = "The Sign Ace of Base";
		}
	} else if(command === "movie-this"){
		if(searchArray.length > 3) {
			for (var i = 3; i < searchArray.length; i++){
				if(searchArray.length === 4){
					searchTerm += searchArray[i]
				} else if (i === searchArray.length-1) {
					searchTerm += searchArray[i]
				} else {
					searchTerm += searchArray[i] +"+"
				}
			}
		} else {
			searchTerm = "Mr.Nobody";
		}
	} 
}

function twitter (){
	var params = {screen_name: 'gc8ftw'};
	twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++){
				var j = i + 1
				console.log("Tweet # " + (j) + ": " + tweets[i].text)
			}
		}
	});
}

function spotify (){
	spotifyKeys.search({ type: 'track', query: searchTerm }).then(function(response) {
	    console.log("Artist: " + response.tracks.items[0].artists[0].name + "\nAlbum: " + response.tracks.items[0].album.name + "\nSong: " + response.tracks.items[0].name + "\nURL: " + response.tracks.items[0].external_urls.spotify);
	  })
	  .catch(function(err) {
	    console.log(err);
	  });
}

function omdb(){
	var param = "http://www.omdbapi.com/?t=" + searchTerm +"&y=&plot=short&apikey=40e9cece"
	request(param, function(error, response, body) {
		body = JSON.parse(body);
		if (body.Response !== "False") {
		console.log("Title: " + body.Title + "\nYear: " + body.Year + "\nIMDB Rating: " + body.Ratings[0].Value +  "\nRotten Tomatoes Rating: " + body.Ratings[1].Value + "\nCountry: " + body.Country +  "\nLanguage: " + body.Language +  "\nPlot: " + body.Plot +  "\nActors: " + body.Actors);
		} else {
			console.log("Movie not found, please try again.")
		}
	});
}

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			var dataArr = data.split(",");
			command = dataArr[0];
			searchArray[3] = dataArr[1].trim();
			verifyCommand();
		}
	});
}

