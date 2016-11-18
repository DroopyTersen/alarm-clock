var ajax = require("../ajax");
var dom = require("../domUtils");
var create = function(selector) {
    var comp = {};
    comp.container = dom.findOne(selector);


    comp.updateWeather = () => {
        var url = "/api/weather/conditions/Menomonee Falls";
        ajax({url}).then(comp.render);
    }
    
    comp.render = (conditions) => {
        console.log(conditions);
        var html = `
        <div class='temperature'>${conditions.temp_f}&deg;</div>
        <div class='description'>${conditions.weather}</div>
        `
        comp.container.innerHTML = html;
    };

    setInterval(comp.updateWeather, 60000)
    comp.updateWeather();

    comp.container.addEventListener("click", () => {
        comp.container.classList.add("active");
        window.location.href = "/forecast"
    });
    return comp;
}; 

module.exports = { create }