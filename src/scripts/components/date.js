var dom = require("../domUtils");
var moment = require('moment');

var create = function(selector) {
    var comp = {};
    comp.container = dom.findOne(selector);

    comp.updateDate = () => {
        var html = `
        <div class='date'>${moment().format('MMM Do')}</div>
        <div class='day'>${moment().format('dddd')}
        `
        comp.container.innerHTML = html;
    }
    
    setInterval(comp.updateDate, 30000)
    comp.updateDate();
    return comp;
}; 

module.exports = { create };