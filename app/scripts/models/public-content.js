var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;


var UserPost = ParseModel.extend({

});

var UserPostCollection = ParseCollection.extend({
  model: UserPost,

});


module.exports = {
  UserPost: UserPost,
  UserPostCollection: UserPostCollection
};
