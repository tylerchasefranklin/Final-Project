var Backbone = require('backbone');
var $ = require('jquery');
require('./router');
var QuoteCollection = require('./models/randomquotes').QuoteCollection;

// DOM Ready


$(function(){
  // function getQuotes(){
  //   $.ajax('https://spider-man.herokuapp.com/classes/Quotes', {
  //     headers: {
  //       'X-Parse-Application-Id': 'spidermanparseserver',
  //       'X-Parse-REST-API-Key': 'webslinger'
  //     },
  //   }).then(function(response){
  //     console.log('response', response.results);
  //     return response.results;
  //   });
  //   // var myQuotes = new QuoteCollection();
  //   // myQuotes.fetch().then(function(data){
  //   //   console.log(data.results);
  //   // });
  // };
  // getQuotes();

  Backbone.history.start();
});
