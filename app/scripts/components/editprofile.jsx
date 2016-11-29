var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var FileModel = require('../models/file').FileModel;
var User = require('../models/user').User;
var UserCollection = require('../models/user').UserCollection;


var EditProfileContainer = React.createClass({
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
  getInitialState: function(){
    return {
      newState: {},
      // user: User.current()
    }
  },
  handleInput: function(e){
    var inputField = e.target;
    var newState = {};
    newState[inputField.name] = inputField.value;
    // console.log(newState);
    this.setState(newState);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var newState = this.state;
    var user = this.props.user;
    console.log('props', user);
    console.log(newState);
    user.set(newState);
    user.save();
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  render: function(){
    var user = this.props.user;
    console.log(user);
    return (
      <div>
        <h1>Update Your Profile</h1>
        <img className="img-rounded img-responsive" src={this.props.user.get('profileImage')}></img>
        <UploadProfilePic uploadPicture={this.props.uploadPicture} />
        <br></br>
        <br></br>
        <div>
          <form id="profile-update" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input className="form-control" onChange={this.handleInput} name="fullname" value={this.state.fullname} id="name" type="name" defaultValue={user.attributes.fullname} placeholder="Enter Your Full Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input className="form-control" onChange={this.handleInput} name="email" value={this.state.email} id="email" type="email" defaultValue={user.attributes.email} placeholder="Enter Your E-Mail" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input className="form-control" onChange={this.handleInput} name="phone" value={this.state.phone} id="phone" type="tel" defaultValue={user.attributes.phone} placeholder="Enter Your Phone Number" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input className="form-control" onChange={this.handleInput} name="address" value={this.state.address} type="text" id="address" defaultValue={user.attributes.address} placeholder="Enter Your Address" />
            </div>
            <div className="form-group">
              <label htmlFor="github-url">GitHub URL</label>
              <input className="form-control" onChange={this.handleInput} name="github" value={this.state.github} type="url" id="github-url" defaultValue={user.attributes.github} placeholder="Enter Your GitHub URL" />
            </div>
            <div className="form-group">
              <label htmlFor="facebook-url">Facebook Page</label>
              <input className="form-control" onChange={this.handleInput} name="facebook" value={this.state.facebook} type="url" id="facebook-url" defaultValue={user.attributes.facebook} placeholder="Enter Your Facebook URL" />
            </div>


            <input className="btn btn-primary" type="submit" value="Update" />
          </form>
        </div>
      </div>

    )
  }
})

module.exports = {
  EditProfileContainer: EditProfileContainer
};
