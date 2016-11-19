var dom = require("./domUtils");
var iot = require("droopy-iot").register("alarm-clock");
var ajax = require("./ajax");

var handlers = {
    navigate: function(payload) {
        if (payload.path) window.location.href = payload.path;
        else console.log("Unable to navigate. Improper payload.")
    },
    getCalendar: function(payload, event) {
        var url = "/api/calendar";
        if (payload.start && payload.end) {
            url += `?start=${payload.start}&end=${payload.end}`
        }
        ajax({url}).then(calendar => event.respond(calendar))
    }
};

module.exports = function() {
    iot.subscribe("navigate", handlers.navigate);
    iot.subscribe("get-calendar", handlers.getCalendar);
};