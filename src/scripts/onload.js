var dom = require("./domUtils");
var iot = require("droopy-iot").register("alarm-clock");
var ajax = require("./ajax");

var handlers = {
    navigate: function(payload) {
        if (payload.path) window.location.href = payload.path;
        else console.log("Unable to navigate. Improper payload.")
    }
};

module.exports = function() {
    iot.subscribe("navigate", handlers.navigate);
};