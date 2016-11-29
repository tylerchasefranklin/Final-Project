var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var FileModel = require('../models/file').FileModel;
var User = require('../models/user').User;
var UserCollection = require('../models/user').UserCollection;

var ProfileViewContainer = React.createClass({
  getInitialState: function(){
    return {
      user: User.current(),
    }
  },
  render: function(){
    var user = this.state.user;
    console.log(user);
    return (
      <TemplateComponent>
        <img className="img-rounded img-responsive" src={this.state.user.get('profileImage')}></img>
        <p>{user.get('fullname')}</p>
        <p>{user.get('email')}</p>
        <p>{user.get('phone')}</p>
        <p>{user.get('address')}</p>
        <p>{user.get('github')}</p>
        <p>{user.get('facebook')}</p>
      </TemplateComponent>
    )
  }
});


module.exports = {
  ProfileViewContainer: ProfileViewContainer
};
