(function (homeController) {
    var theLog = null;

    homeController.init = function (app, config, log) {
        theLog = log;
        app.get('/', function (req, res) {
            res.render('index', { title: 'Advance Scatter Plot'});
        });
    };
})(module.exports);