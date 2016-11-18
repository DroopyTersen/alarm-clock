var apiKey = "ae55f9d6f8278139";
var request = require("request-promise-native");

var baseUrl = "http://api.wunderground.com/api/" + apiKey;

exports.getCurrentConditions = function(city) {
    city = city.replace(/ /g,"_");

    var url = `${baseUrl}/conditions/q/WI/${city}.json`
    return request({ url, json: true}).then(data => data.current_observation);
}