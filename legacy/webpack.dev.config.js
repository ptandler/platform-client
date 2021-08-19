var path    = require('path');
var config  = require('./webpack.config');

config.mode = 'development';

config.devtool = 'sourcemap'

config.devServer = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
module.exports = config;
