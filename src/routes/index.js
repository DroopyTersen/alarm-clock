exports.configure = function(app) {
    app.get("/", (req, res) => res.render("home"));
    app.get("/:view", (req, res) => res.render(req.params.view));

    require("./api").configure(app);
}