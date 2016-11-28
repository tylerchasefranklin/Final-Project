var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var SignUpLoginContainer = require('./components/login.jsx').SignUpLoginContainer;
var HomeContainer = require('./components/quotegenerator.jsx').HomeContainer;
var JournalComposition = require('./components/journal.jsx').JournalComposition;
var ChatContainer = require('./components/chat.jsx').ChatContainer;
var UserPostInput = require('./components/publicmessageinput.jsx').UserPostInput;
var UserProfileContainer = require('./components/profile.jsx').UserProfileContainer;
var GeneratorContainer = require('./components/justforme.jsx').GeneratorContainer;
var GeneratedMaterial = require('./components/generatedmaterial.jsx').GeneratedMaterial;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home/': 'home',
    'profile/': 'profile',
    'justforme/': 'justforme',
    'mystuff/': 'mystuff',
    'journal/': 'journal',
    'chat/': 'chat',
    'post/': 'post'
  },
  index: function(){
    // console.log('index screen working');
    ReactDOM.render(
      React.createElement(SignUpLoginContainer),
      document.getElementById('app')
    );
  },
  profile: function(){
    ReactDOM.render(
      React.createElement(UserProfileContainer),
      document.getElementById('app')
    );
  },
  justforme: function(){
    ReactDOM.render(
      React.createElement(GeneratorContainer),
      document.getElementById('app')
    );
  },
  mystuff: function(){
    ReactDOM.render(
      React.createElement(GeneratedMaterial),
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
  chat: function(){
    ReactDOM.render(
      React.createElement(ChatContainer),
      document.getElementById('app')
    );
  },
  post: function(){
    ReactDOM.render(
      React.createElement(UserPostInput),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router
};
