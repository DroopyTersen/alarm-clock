var dom = require("../domUtils");
var moment = require('moment');

var create = function(selector) {
    var comp = {};
    comp.container = dom.findOne(selector);

    comp.updateTime = () => comp.container.innerHTML = `${moment().format("LT")}`
    
    setInterval(comp.updateTime, 1000)
    comp.updateTime();

    return comp;
};

module.exports = { create };