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
        <img className="col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-4 profile-icon img-rounded" src="images/Profile.png"></img>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div id="profile" className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="col-xs-8 col-sm-5 col-md-5 col-lg-3">
                <img id="profile-image" className="img-rounded img-responsive" src={this.state.user.get('profileImage')}></img>
              </div>
              <div id="user-info" className="col-xs-12 col-sm-5 col-md-5 col-lg-6">
                <p className="profile-item"><span className="profile-item-name">Name:</span> {user.get('fullname')}</p>
                <p className="profile-item"><span className="profile-item-name">E-Mail:</span> {user.get('email')}</p>
                <p className="profile-item"><span className="profile-item-name">Phone Number:</span> {user.get('phone')}</p>
                <p className="profile-item"><span className="profile-item-name">Address:</span> {user.get('address')}</p>
                <p className="profile-item"><span className="profile-item-name">GitHub Page:</span> {user.get('github')}</p>
                <p className="profile-item"><span className="profile-item-name">Facebook Page:</span> {user.get('facebook')}</p>
              </div>
            </div>
          </div>
        </div>
      </TemplateComponent>
    )
  }
});


module.exports = {
  ProfileViewContainer: ProfileViewContainer
};
