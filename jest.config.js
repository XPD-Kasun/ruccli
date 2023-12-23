const path = require('path');

const config = {
       "verbose": true,
       "maxWorkers": 1,
       transform: {
              "^.+\\.[t|j]sx?$": ["babel-jest", {configFile: path.resolve(__dirname, 'babel.test.config.json')}]
       }
};

module.exports = config;