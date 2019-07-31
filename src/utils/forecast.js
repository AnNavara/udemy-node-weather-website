const request = require('request');

const forecast = (long, lat, callback) => {
  const url = 'https://api.darksky.net/forecast/9a00067841f7985b160d85f1be729775/' + long + ',' + lat + '?units=si&lang=ru&exclude=minutely,hourly';

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to services', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const temp = body.currently.temperature;
      const tempHigh = body.daily.data[0].temperatureHigh;
      const tempLow = body.daily.data[0].temperatureLow;
      const rainChance = body.currently.precipProbability;
      const dailySummary = body.daily.data[0].summary;
      const tommorowSummary = body.daily.data[1].summary;
      callback(undefined, `${dailySummary} В данный момент ${temp} градусов. Максимальная температура в течении дня ${tempHigh}, минимальная ${tempLow}. Шанс осадков ${rainChance}%. Завтра ${tommorowSummary}`);
    }
  })
}

module.exports = forecast;
