var stocks = require("../stocks")
var dom = require("../domUtils");

var stockSymbols = [ "IVV", "ONVO", "IUSV", "NOC", "ESLT", "VGT" ];

var create = function(selector) {
    var comp = {};
    comp.container = dom.findOne(selector);


    comp.updateStocks = () => {
        stocks.getPrices(stockSymbols).then(comp.render);
    }
    
    var stockToHtml = (stock) => {
        var cssClass = stock.percentage > 0 ? "green" : "red"
        return `
        <span class='stock'>
            <span class='symbol'>${stock.symbol}</span>:
            <span class='percentage ${cssClass}'>${stock.percentage}%</span>
        </span>`
    }
    comp.render = (stocks) => {
        var html = stocks.map(stockToHtml).join("\n");
        comp.container.innerHTML = html;
    };

    setInterval(comp.updateStocks, 45000)
    comp.updateStocks();
    return comp;
}; 

module.exports = { create }