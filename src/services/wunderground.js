var apiKey = "98f6d0949c244ff1";
var request = require("request-promise-native");

var baseUrl = "http://api.wunderground.com/api/" + apiKey;

exports.getCurrentConditions = function(city) {
    city = city.replace(/ /g,"_");

    var url = `${baseUrl}/conditions/q/WI/${city}.json`
    return request({ url, json: true}).then(data => data.current_observation).catch(e => console.log(e));
}

exports.getForecast = function(city) {
    city = city.replace(/ /g,"_");

    var url = `${baseUrl}/forecast/q/WI/${city}.json`
    return request({ url, json: true}).then(data => data.forecast.txt_forecast.forecastday).catch(e => console.log(e));
}
