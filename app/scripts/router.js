var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var SignUpLoginContainer = require('./components/login.jsx').SignUpLoginContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login/': 'login'
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
  },
  index: function(){
    // console.log('index screen working');
    ReactDOM.render(
      React.createElement(SignUpLoginContainer),
      document.getElementById('app')
    );
  },
});

var router = new AppRouter();

module.exports = {
  router: router
};
