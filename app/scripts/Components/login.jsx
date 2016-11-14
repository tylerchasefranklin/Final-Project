var React = require('react');
var Backbone = require('backbone');
var models = require('../models/user');

var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: '',
    };
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
  render: function(){
    return (
      <div>
        <form id="signup" onSubmit={this.handleSubmit}>
          <h2>Need an Account? Sign Up!</h2>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input className="form-control" onChange={this.handleEmail} value={this.state.email} name="email" id="email" type="email" placeholder="email" />
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
    email: '',
    password: '',
  };
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
  render: function(){
    return(
      <form id="login" onSubmit={this.props.handleLogin}>
        <h2>Please Login</h2>
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input className="form-control" value={this.email} name="email" id="email-login" type="email" placeholder="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input className="form-control" value={this.password} name="password" id="password-login" type="password" placeholder="Password" />
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
  render: function(){
    return (
      <div>

        <SignUpForm />
        <LoginForm />
      </div>
    )
  }
});

module.exports = {
  SignUpLoginContainer: SignUpLoginContainer
};
