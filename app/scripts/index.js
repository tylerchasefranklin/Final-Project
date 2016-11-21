var Backbone = require('backbone');
var $ = require('jquery');
require('./router');
var QuoteCollection = require('./models/randomquotes').QuoteCollection;

// DOM Ready

// $('body').dropdown();
$(function(){
  Backbone.history.start();
});
