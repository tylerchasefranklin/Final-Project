var React = require('react');
var Backbone = require('backbone');


var TemplateComponent = React.createClass({
  render: function(){
    return (
      <div className="wrapper">
        <Navbar />
        <div className="container">
          <div className="row">


            {this.props.children}


          </div>
        </div>
        <Footer />
      </div>
    )
  }
});

var Navbar = React.createClass({
  logoutUser: function(){
    delete localStorage.username;
    delete localStorage.password;
    delete localStorage.token;
    delete localStorage.user;
  },
  render: function(){
    var username = localStorage.username;
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href={"#home/"}>Home</a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href={"#profile/"}>Profile</a></li>
              <li><a href={"#justforme/"}>JustForMe</a></li>
              <li><a href={"#journal/"}>Journal</a></li>
              <li><a href={"#chat/"}>Chat</a></li>
              <li><a href={"#post/"}>Post</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#profile/">Signed In As: {username}</a></li>
              <li><a href={"#profile/"}>Edit Profile</a></li>
              <li><a href="#" onClick={this.logoutUser}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

var Footer = React.createClass({
  render: function(){
    var username = localStorage.username;
    return (
      <nav className="navbar navbar-inverse navbar-bottom">
        <div className="container-fluid">
          <div className="navbar-footer">
            <a className="navbar-brand" href={"#home/"}>Home</a>
            <ul className="nav navbar-nav">
              <li><a href="#profile/">Profile</a></li>
              <li><a href={"#justforme/"}>JustForMe</a></li>
              <li><a href={"#journal/"}>Journal</a></li>
              <li><a href={"#chat/"}>Chat</a></li>
              <li><a href={"#post/"}>Post</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#profile/">Signed In As: {username}</a></li>
              <li><a href="#">Edit Profile</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});


module.exports = {
  TemplateComponent: TemplateComponent
};
