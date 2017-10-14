console.log('this is loaded');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitter = new Twitter({
  consumer_key: 'v5CqbrWvinP0e3SgPlMouB7Ij',
  consumer_secret: 'yCFg3OqJzsonHw8RJcaZojrpfjeZBGvVZSxWx1fZGKbqmYkVTm',
  access_token_key: '230558107-mswooaFp5NLlXOnhiG7PilueAxhZkKEHvcUs1mha',
  access_token_secret: 'CxKOIdsEnqVuGKX3DKxT4wZ752Ea9dzoMxMWwb25j056D'
});

var spotify = new Spotify({
  id: '643288208afe4dcdaf53bbe14ad82142',
  secret: '47ce80ef210c40118108c1a396487a52'
});

module.exports = {
	spotify: spotify,
	twitter: twitter
}


