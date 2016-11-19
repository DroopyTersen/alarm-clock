var ajax = require("../ajax");
var dom = require("../domUtils");
var moment = require("moment");

var create = function(selector) {
    var comp = {};
    comp.container = dom.findOne(selector);

    var eventToHtml = function(event) {
        var time = moment(event.start).format('LT') + " - " + moment(event.end).format('LT')
        return `
        <div class='event'>
            <div class='subject'>${event.subject}</div>
            <div class='time'>${time}</div>
        </div>
        `
    }
    var calendarDayToHtml = function(day) {
        return `
        <div class='calendar-day'>
            <h4 class='title'>${moment(new Date(day.title)).format('dddd')}</h4>
            <div class='events'>
            ${day.events.map(eventToHtml).join("")}
            </div>
        </div> 
        `
    }

    comp.render = (days) => {
        console.log(days);
        var html = days.map(calendarDayToHtml).join("");
        comp.container.innerHTML = html;
    };

    var url = "/api/calendar";
    ajax({url}).then(comp.render);
    return comp;
}; 

module.exports = { create }