var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var SignUpLoginContainer = require('./components/login.jsx').SignUpLoginContainer;
var QuoteGenerator = require('./components/quotegenerator.jsx').QuoteGenerator;
var JournalEntry = require('./components/journal.jsx').JournalEntry;
var ChatContainer = require('./components/chat.jsx').ChatContainer;
var PublicMessageInput = require('./components/publicmessageinput.jsx').PublicMessageInput;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home/': 'home',
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
  home: function(){
    ReactDOM.render(
      React.createElement(QuoteGenerator),
      document.getElementById('app')
    );
  },
  journal: function(){
    ReactDOM.render(
      React.createElement(JournalEntry),
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
      React.createElement(PublicMessageInput),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router
};
