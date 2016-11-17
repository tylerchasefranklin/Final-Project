var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;


var UserPost = ParseModel.extend({
  idAttribute: 'objectId'
});

var UserPostCollection = ParseCollection.extend({
  model: UserPost,
  url: 'https://spider-man.herokuapp.com/classes/UserPostPublic'
});


module.exports = {
  UserPost: UserPost,
  UserPostCollection: UserPostCollection
};
