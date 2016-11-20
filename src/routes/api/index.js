var weather = require("../../services/wunderground");
var moment = require("moment");
var graph = require("../../services/graph");
var iot = require("droopy-iot").register("alarm-clock");

exports.configure = function(app) {
    app.get("/api/weather/conditions/:city", (req, res) => {
        weather.getCurrentConditions(req.params.city).then(result => res.send(result));
    });
    app.get("/api/weather/forecast/:city", (req, res) => {
        weather.getForecast(req.params.city).then(result => res.send(result));
    });

    app.get("/api/calendar", (req, res) => {
        getCalendar(req.query.start, req.query.end)
            .then(events => res.send(events))
            .catch(err => res.send(err))
    })
}

iot.subscribe("get-calendar", function(payload, event) {
    payload = payload || {};
    getCalendar(payload.start, payload.end).then(cal => event.respond(cal));
});

var getCalendar = function(start, end) {
    start = (start) ? moment(new Date(start)) : moment(new Date()).hours(0).minutes(0).seconds(0);
    end = end ? moment(new Date(end)).add(1, 'days') : moment(start).add(3, "days");
    return graph.getCalendarView("apetersen@skylinetechnologies.com", start, end);
}