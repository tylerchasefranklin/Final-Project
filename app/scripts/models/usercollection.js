var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;

var UserMaterial = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://spider-man.herokuapp.com/classes/UserMaterial'
});

var MaterialCollection = ParseCollection.extend({
  model: UserMaterial,
  url: 'https://spider-man.herokuapp.com/classes/UserMaterial'
});


module.exports = {
  UserMaterial: UserMaterial,
  MaterialCollection: MaterialCollection
};
