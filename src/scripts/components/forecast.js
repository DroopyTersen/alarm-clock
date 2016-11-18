var ajax = require("../ajax");
var dom = require("../domUtils");
var create = function(selector) {
    var comp = {};
    comp.container = dom.findOne(selector);


    var forecastDayToHtml = function(forecast) {
        return `
        <div class='forecast-item'>
            <h4 class='title'>${forecast.title}</h4>
            <div class='icon'><img src='${forecast.icon_url}'></div>
            <p>${forecast.fcttext}</p>
        </div> 
        `
    }

    comp.render = (forecastDays) => {
        console.log(forecastDays);
        var html = forecastDays.slice(0, 6).map(forecastDayToHtml).join("");
        comp.container.innerHTML = html;
    };

    var url = "/api/weather/forecast/Menomonee Falls";
    ajax({url}).then(comp.render);
    return comp;
}; 

module.exports = { create }