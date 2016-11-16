var Backbone = require('backbone');
var $ = require('jquery');
var ParseModel = require('../parse-utilities.js').ParseModel;
var ParseCollection = require('../parse-utilities.js').ParseCollection;


var User = ParseModel.extend({
  urlRoot: 'https://spider-man.herokuapp.com/classes/User',
  signUp: function(){
    var self = this;
    var username = this.get('username');
    var password = this.get('password');

    // this.save().then(function(data){
    //   console.log(data);
    //   localStorage.setItem('user', JSON.stringify(self.toJSON()));
    // });
  },
  initialize: function(response){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'spidermanparseserver');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'webslinger');
        if (response){
          xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
        }
      }
    });
  }
});

var UserCollection = ParseCollection.extend({
  model: User,
  url: 'https://spider-man.herokuapp.com/classes/User'
});

module.exports = {
  User: User,
  UserCollection: UserCollection
};
