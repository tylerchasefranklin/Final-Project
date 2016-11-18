var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var FileModel = require('../models/file').FileModel;
var User = require('../models/user').User;
var UserCollection = require('../models/user').UserCollection;


var UserProfileContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User(),
      userCollection: new UserCollection()
    }
  },
  componentWillMount: function(){
    var user = this.state.user;
    var userCollection = this.state.userCollection;
    userCollection.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(response){
      console.log(response);
    });
    console.log('user', user);
    console.log('userCollection', userCollection);
  },
  render: function(){
    return (
      <TemplateComponent>
        <h1>User Profile</h1>
        <EditUserProfile />
      </TemplateComponent>

    )
  }
});

var UserInformation = React.createClass({
  render: function(){
    return (
      <div>

      </div>
    )
  }
});

var UploadProfilePic = React.createClass({
  render: function(){
    return (
      <form action="https://spider-man.herokuapp.com/" id="profile" method="POST" encType="multipart/form-data">
        <label className="btn btn-default btn-file" htmlFor="file-select">
          <input id="file-select" type="file" id="pic1" name="pic1" />
        </label>

        <input className="btn btn-success" type="submit" />
      </form>
    );
  }
});

var EditUserProfile = React.createClass({
  getInitialState: function(){
    return {
      user: new User()
    }
  },
  render: function(){
    return (
      <div>
        <h1>This is how you will create your profile</h1>
        <img className="img-rounded img-responsive" src="http://unsplash.it/200/200"></img>
        <UploadProfilePic />
      </div>

    )
  }
})

module.exports = {
  UserProfileContainer: UserProfileContainer
};
