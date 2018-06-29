//config.js
(function (config) {
    var nconf = require('nconf');
    var appconfig = null;
    
    config.getConfig = function (next) {
        if (!appconfig) {
            nconf.argv()
                .env()
                .file({ file: 'config.json' });
            appconfig = nconf;
            next(null, nconf);
        } else {
            next(null, appconfig);
        }
    };
})(module.exports);