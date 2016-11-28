var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var FileModel = require('../models/file').FileModel;
var User = require('../models/user').User;
var UserCollection = require('../models/user').UserCollection;


var UserProfileContainer = React.createClass({
  getInitialState: function(){
    return {
      user: User.current(),
      userCollection: new UserCollection(),
      file: new FileModel()
    }
  },
  uploadPicture: function(picture){
    var file = new FileModel();
    var self = this;
    file.set('name', picture.name);
    file.set('data', picture);
    file.save().done(function(){
      var user = User.current();
      user.set('profileImage', file.get('url'));
      user.save();
      self.setState({user: user})
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
    });

  },
  // componentWillMount: function(){
  //   var user = this.state.user;
  //   var userCollection = this.state.userCollection;
  //   userCollection.fetch({headers: {
  //     "X-Parse-Application-Id": "spidermanparseserver",
  //     "X-Parse-REST-API-Key": "webslinger"
  //   }}).then(function(response){
  //     console.log(response);
  //   });
  //   // console.log('user', user);
  //   // console.log('userCollection', userCollection);
  // },
  render: function(){
    return (
      <TemplateComponent>
        <h1>User Profile</h1>
        <EditUserProfile user={this.state.user} uploadPicture={this.uploadPicture}/>
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
  handlePicture: function(e){
    e.preventDefault();
    var picture = e.target.files[0];
    this.props.uploadPicture(picture);
    this.setState({picture: picture});
    // console.log(picture);
  },

  render: function(){
    return (
      <form onSubmit={function(e){e.preventDefault()}} action="/" id="profile" method="POST" encType="multipart/form-data">
        <label className="btn btn-default btn-file" htmlFor="file-select">
          <input onChange={this.handlePicture} id="file-select" type="file" id="pic1" name="pic1" />
        </label>
      </form>
    );
  }
});

var EditUserProfile = React.createClass({
  render: function(){
    console.log(this.props.user);
    return (
      <div>
        <h1>This is how you will create your profile</h1>
        <img className="img-rounded img-responsive" src={this.props.user.get('profileImage')}></img>
        <UploadProfilePic uploadPicture={this.props.uploadPicture} />
      </div>

    )
  }
})

module.exports = {
  UserProfileContainer: UserProfileContainer
};
