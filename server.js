var bodyParser = require("body-parser");
var express = require("express");
var hbs = require("hbs");
var config = { port: process.env.PORT || 3000 };
var app = express();


hbs.registerPartials(__dirname + '/src/views/partials');
// we need the body parser so we can get at the POST body that Amazon sends
app.use(bodyParser.json());
app.set('env', "development");
app.set('view cache', false);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get("/favicon.ico", (req, res) => res.sendStatus(200));
require("./src/routes").configure(app);
// Start the web server on the specified port
app.listen(config.port, process.env.IP, function() {
    console.log("Server running on port " + config.port)
});
