var ajax = require("./ajax");

var getPrices = exports.getPrices = exports.getPrice = function(symbols) {
    var symbol = symbols.join(",");
    var url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D${symbol}%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json`
    return ajax({url}).then(json => {
        return json.query.results.row
    }).then(stocks => {
        stocks.forEach(s => {
            s.change = parseFloat(s.change);
            s.price = parseFloat(s.price);
            s.percentage = (s.change * 100 / (s.price - s.change)).toFixed(2);
        })
        return stocks;
    });
};
