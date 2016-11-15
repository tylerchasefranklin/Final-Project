var React = require('react');
var Backbone = require('backbone');
var models = require('../models/user');
var $ = require('jquery');

var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  handleUsername: function(e){
    var username = e.target.value;
    // console.log(username);
    this.setState({username: username});
  },
  handleEmail: function(e){
    var email = e.target.value;
    // console.log(email);
    this.setState({email: email});
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.signUpNewUser(signUpData);
    // console.log(signUpData);
    this.setState({username: '', email: '', password: ''});
  },
  render: function(){
    return (
      <div>
        <form id="signup" onSubmit={this.handleSubmit}>
          <h2>Need an Account? Sign Up!</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="form-control" onChange={this.handleUsername} value={this.state.username} name="username" id="username" type="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input className="form-control" onChange={this.handleEmail} value={this.state.email} name="email" id="email" type="email" placeholder="E-mail" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" onChange={this.handlePassword} value={this.state.password} name="password" id="password" type="password" placeholder="Password" />
          </div>

          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </form>
      </div>
    );
  }
});

var LoginForm = React.createClass({
getInitialState: function(){
  return {
    username: '',
    password: '',
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
  var username = this.state.username;
  var password = this.state.password;
  var url = 'https://spider-man.herokuapp.com/login?';
  var loginUrl = url + 'username=' + encodeURI(username) + '&password=' + encodeURI(password);
  $.ajax(loginUrl, {
    success: function(response){
      var token = localStorage.token;
      alert('You Logged In!');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('token', response.sessionToken);
      if(token){
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
      <form id="login" onSubmit={this.handleLogin}>
        <h2>Please Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input className="form-control" onChange={this.handleUsername} value={this.state.username} name="username" id="username" type="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input className="form-control" onChange={this.handlePassword} value={this.state.password} name="password" id="password-login" type="password" placeholder="Password" />
        </div>
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
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
      'email': signUpData.email,
      'password': signUpData.password
    };
    user.set(data);
    var reponse = $.post('https://spider-man.herokuapp.com/users/', data).then(function(response){
      // console.log('test', response.sessionToken);
      //
      // console.log(response);
      // console.log(data);
   });
  },
  render: function(){
    return (
      <div>
        <SignUpForm signUpNewUser={this.signUpNewUser}/>
        <LoginForm />
      </div>
    )
  }
});


module.exports = {
  SignUpLoginContainer: SignUpLoginContainer
};
