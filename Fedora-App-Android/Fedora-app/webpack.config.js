const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
    useDefaultConfig[process.env.IONIC_ENV].resolve.alias = {
        "@environment": path.resolve(__dirname + '/src/app/config.' + process.env.IONIC_ENV + '.ts'),
    };
    return useDefaultConfig;
};
