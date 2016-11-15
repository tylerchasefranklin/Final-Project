var Backbone = require('backbone');
var $ = require('jquery');
require('./router');

// DOM Ready


$(function(){
  Backbone.history.start();
});
