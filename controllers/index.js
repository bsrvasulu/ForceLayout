(function (controllers) {
    var homeController = require("./homeController");

    controllers.init = function (app, config, log) {
        homeController.init(app, config, log);
    };

})(module.exports);