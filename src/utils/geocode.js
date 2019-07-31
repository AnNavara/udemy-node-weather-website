const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmF2YXJhIiwiYSI6ImNqeW9qdnJyNjB5cHgzZ3BlODJxb202ZzYifQ.-5rDAp_pJwIj4NHqvSbb8w&limit=1&name_ru';
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  });
}

module.exports = geocode;

