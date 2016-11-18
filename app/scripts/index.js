var Backbone = require('backbone');
var $ = require('jquery');
require('./router');
var QuoteCollection = require('./models/randomquotes').QuoteCollection;

// DOM Ready


$(function(){
  Backbone.history.start();
});
