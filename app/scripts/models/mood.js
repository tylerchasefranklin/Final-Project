var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;


var Mood = ParseModel.extend({
  urlRoot: 'https://spider-man.herokuapp.com/Mood',
});

var MoodCollection = ParseCollection.extend({
  model: Mood,
  url: 'https://spider-man.herokuapp.com/Mood'
});


module.exports = {
  Mood: Mood,
  MoodCollection: MoodCollection
};
