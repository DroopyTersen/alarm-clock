var smartClock = {};
smartClock.utils = {
    dom: require("../src/scripts/domUtils")
}
smartClock.components = require("../src/scripts/components");
global.smartClock = smartClock;
var onload = require("../src/scripts/onload");
onload();