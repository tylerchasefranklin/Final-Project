var Backbone = require('backbone');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;
var $ = require('jquery');

var RandomQuote = Backbone.Model.extend({
  idAttribute: 'ID'
});

var RandomQuoteCollection = Backbone.Collection.extend({
  model: RandomQuote,
  url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
});

var Quote = ParseModel.extend({
  idAttribute: 'objectId'
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
