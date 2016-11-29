var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;


var UserPost = ParseModel.extend({
  defaults: {
    voters: []
  },
  idAttribute: 'objectId',
  urlRoot: 'https://spider-man.herokuapp.com/classes/UserPostPublic'
});

var UserPostCollection = ParseCollection.extend({
  comparator: function(model){
    return -(new Date(model.get('createdAt'))).getTime();
  },
  model: UserPost,
  url: 'https://spider-man.herokuapp.com/classes/UserPostPublic'
});


module.exports = {
  UserPost: UserPost,
  UserPostCollection: UserPostCollection
};
