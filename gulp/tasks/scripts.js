var gulp = require('gulp'),
webpack = require('webpack');

function scripts(done) {
  webpack(require('./../../webpack.config.js'), function(err, stats) {
    if(err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    done();
  });
}

module.exports = scripts;
