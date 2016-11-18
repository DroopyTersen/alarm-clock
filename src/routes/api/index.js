var weather = require("../../services/wunderground");

exports.configure = function(app) {
    app.get("/api/weather/conditions/:city", (req, res) => {
        weather.getCurrentConditions(req.params.city).then(result => res.send(result));
    });
    app.get("/api/weather/forecast/:city", (req, res) => {
        weather.getForecast(req.params.city).then(result => res.send(result));
    });
}