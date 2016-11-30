var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var SignUpLoginContainer = require('./components/login.jsx').SignUpLoginContainer;
var HomeContainer = require('./components/quotegenerator.jsx').HomeContainer;
var JournalComposition = require('./components/journal.jsx').JournalComposition;
var UserPostInput = require('./components/publicmessageinput.jsx').UserPostInput;
var EditProfileContainer = require('./components/editprofile.jsx').EditProfileContainer;
var GeneratorContainer = require('./components/justforme.jsx').GeneratorContainer;
var ProfileViewContainer = require('./components/profile.jsx').ProfileViewContainer;
var MyCollection = require('./components/mycollection.jsx').MyCollection;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home/': 'home',
    'profile/': 'profile',
    'editProfile/': 'editProfile',
    'justforme/': 'justforme',
    'journal/': 'journal',
    'post/': 'post',
    'myCollection/': 'myCollection'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(SignUpLoginContainer),
      document.getElementById('app')
    );
  },
  profile: function(){
    ReactDOM.render(
      React.createElement(ProfileViewContainer),
      document.getElementById('app')
    );
  },
  editProfile: function(){
    ReactDOM.render(
      React.createElement(EditProfileContainer),
      document.getElementById('app')
    );
  },
  justforme: function(){
    ReactDOM.render(
      React.createElement(GeneratorContainer),
      document.getElementById('app')
    );
  },
  home: function(){
    ReactDOM.render(
      React.createElement(HomeContainer),
      document.getElementById('app')
    );
  },
  journal: function(){
    ReactDOM.render(
      React.createElement(JournalComposition),
      document.getElementById('app')
    );
  },
  post: function(){
    ReactDOM.render(
      React.createElement(UserPostInput),
      document.getElementById('app')
    );
  },
  myCollection: function(){
    ReactDOM.render(
      React.createElement(MyCollection),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router
};
