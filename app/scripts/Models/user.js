var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;


var User = ParseModel.extend({
  urlRoot: 'https://spider-man.herokuapp.com/users',
});



var UserCollection = ParseCollection.extend({
  model: User,
  url: 'https://spider-man.herokuapp.com/users'
});

module.exports = {
  User: User,
  UserCollection: UserCollection
};
