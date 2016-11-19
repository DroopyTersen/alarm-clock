var weather = require("../../services/wunderground");
var moment = require("moment");
var graph = require("../../services/graph");

exports.configure = function(app) {
    app.get("/api/weather/conditions/:city", (req, res) => {
        weather.getCurrentConditions(req.params.city).then(result => res.send(result));
    });
    app.get("/api/weather/forecast/:city", (req, res) => {
        weather.getForecast(req.params.city).then(result => res.send(result));
    });

    app.get("/api/calendar", (req, res) => {
        var start = (req.query.start) ? moment(new Date(req.query.start)) : moment(new Date()).hours(0).minutes(0).seconds(0);
        var end = (req.query.end) ? moment(new Date(req.query.end)).add(1, 'days') : moment(start).add(4, "days");
        graph.getCalendarView("apetersen@skylinetechnologies.com", start, end)
            .then(events => res.send(events))
            .catch(err => res.send(err))
    })
}
