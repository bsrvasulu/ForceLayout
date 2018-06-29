(function (configuration) {
    var config = require("./config");
    configuration.getAppconfig = function (next) {
        config.getConfig(next);
    };
})(module.exports);