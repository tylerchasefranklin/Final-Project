var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;

var JournalEntry = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://spider-man.herokuapp.com/classes/JournalEntry'
});

var JournalCollection = ParseCollection.extend({
  model: JournalEntry,
  url: 'https://spider-man.herokuapp.com/classes/JournalEntry'
});


module.exports = {
  JournalEntry: JournalEntry,
  JournalCollection: JournalCollection
};
