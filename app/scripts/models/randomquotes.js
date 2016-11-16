var Backbone = require('backbone');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;
var $ = require('jquery');

var RandomQuote = Backbone.Model.extend({
  idAttribute: 'ID'
});

var RandomQuoteCollection = Backbone.Collection.extend({
  model: RandomQuote,
  url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40'
});

var Quote = ParseModel.extend({
  idAttribute: 'objectId',
  // initialize: function(response){
  //   $.ajaxSetup({
  //     beforeSend: function(xhr){
  //       xhr.setRequestHeader('X-Parse-Application-Id', 'spidermanparseserver');
  //       xhr.setRequestHeader('X-Parse-REST-API-Key', 'webslinger');
  //       if (response){
  //         xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
  //       }
  //     }
  //   });
  // }
});

var QuoteCollection = ParseCollection.extend({
  model: Quote,
  url: 'https://spider-man.herokuapp.com/classes/Quotes'
});


module.exports = {
  RandomQuote: RandomQuote,
  RandomQuoteCollection: RandomQuoteCollection,
  Quote: Quote,
  QuoteCollection: QuoteCollection
};
