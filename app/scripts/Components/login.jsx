var React = require('react');
var Backbone = require('backbone');
var models = require('../models/user');
var $ = require('jquery');

var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: '',
    };
  },
  handleUsername: function(e){
    var username = e.target.value;
    // console.log(username);
    this.setState({username: username});
  },
  handlePassword: function(e){
    var password = e.target.value;
    // console.log(password);
    this.setState({password: password})
  },
  handleSubmit: function(e){
    e.preventDefault();
    // console.log('signed up!');
    var signUpData = {
      username: this.state.username.toLowerCase(),
      password: this.state.password
    };

    this.props.signUpNewUser(signUpData);
    // console.log(signUpData);
    this.setState({username: '', password: ''});
  },
  render: function(){
    return (
      <div className="col-lg-11 col-lg-offset-1 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-3 signup-form">
        <img className="col-lg-2 footer-icon img-rounded" src="images/Journal.png"></img>
        <form id="signup" onSubmit={this.handleSubmit} className="well col-xs-12 col-lg-3 col-lg-offset-2">
          <h2>Need an Account? Sign Up!</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="signup-input form-control" onChange={this.handleUsername} value={this.state.username} name="username" id="username" type="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="signup-input form-control" onChange={this.handlePassword} value={this.state.password} name="password" id="password" type="password" placeholder="Password" />
          </div>
          <input className="btn btn-primary" type="submit" value="I Want To Go!" />
        </form>
        <img className="col-xs-12 col-lg-offset-2 col-xs-offset-1 login-icon img-rounded" src="images/Mood Tracker.png"></img>
      </div>
    );
  }
});

var LoginForm = React.createClass({
getInitialState: function(){
  return {
    username: '',
    password: '',
    user: new models.User()
  };
},
handleUsername: function(e){
  var username = e.target.value;
  this.setState({username: username});
},
handleEmail: function(e){
  var email = e.target.value;
  this.setState({email: email});
},
handlePassword: function(e){
  var password = e.target.value;
  this.setState({password: password})
},
handleLogin: function(e){
  e.preventDefault();
  var username = this.state.username.toLowerCase();
  var password = this.state.password;
  var url = 'https://spider-man.herokuapp.com/login?';
  var loginUrl = url + 'username=' + encodeURI(username) + '&password=' + encodeURI(password);
  $.ajax(loginUrl, {
    headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    },
    success: function(response){
      var token = localStorage.token;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('token', response.sessionToken);
      localStorage.setItem('user', JSON.stringify(response));
      if(response.sessionToken){
        Backbone.history.navigate('home/', {trigger: true});
      }
    },
    error: function(xhr){
      $('.error').html(xhr.responseJSON.error);
    }
  });
  this.setState({username: '', password: ''});
},
  render: function(){
    return(
      <div className="col-lg-11 col-lg-offset-1 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-6 col-xs-offset-3 login-form">
        <img className="col-lg-2 login-icon first-icon img-rounded" src="images/Post.png"></img>
        <form id="login" onSubmit={this.handleLogin} className="well col-xs-12 col-lg-3 col-lg-offset-2">
          <h2>Please Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="login-input form-control" onChange={this.handleUsername} value={this.state.username} name="username" id="username" type="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password-login">Password</label>
            <input className="login-input form-control" onChange={this.handlePassword} value={this.state.password} name="password" id="password-login" type="password" placeholder="Password" />
          </div>
          <input className="btn btn-primary" type="submit" value="To My Happy Place!" />
        </form>
        <img className="col-xs-12 col-lg-offset-2 col-xs-offset-1 login-icon img-rounded" src="images/Quote Gen.png"></img>
      </div>
    )
  }
});

var SignUpLoginContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new models.User()
    };
  },
  signUpNewUser: function(signUpData){
    var user = new models.User();
    var data = {
      'username': signUpData.username,
      'password': signUpData.password
    };
    user.set(data);
    user.save().then(function(response){
      localStorage.setItem('username', signUpData.username);
      localStorage.setItem('password', signUpData.password);
      localStorage.setItem('token', response.sessionToken);
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
      if(response.sessionToken){
        Backbone.history.navigate('editProfile/', {trigger: true});
      }
    });
  },
  render: function(){
    return (
      <div className="container-fluid">
        <h1 className="col-lg-11 login-title">Welcome To Your Happy Place!</h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <LoginForm />
        <SignUpForm signUpNewUser={this.signUpNewUser}/>
      </div>
    )
  }
});


module.exports = {
  SignUpLoginContainer: SignUpLoginContainer
};
