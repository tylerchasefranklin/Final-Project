var React = require('react');
var Backbone = require('backbone');


var TemplateComponent = React.createClass({
  render: function(){
    return (
      <div className="wrapper">
        <Navbar />
        <div className="container-fluid">
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
              <li><a href={"#myCollection/"}>My Collection</a></li>
              <li><a href={"#justforme/"}>JustForMe</a></li>
              <li><a href={"#journal/"}>Journal</a></li>
              <li><a href={"#post/"}>Post</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#profile/">Signed In As: {username[0].toUpperCase() + username.slice(1)}</a></li>
              <li><a href={"#editProfile/"}>Edit Profile</a></li>
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
        <div className="footer container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <a href={"#home/"}><img className="col-lg-offset-1 footer-icon first-icon img-rounded" src="../app/images/Post.png"></img></a>
              <a href={"#profile/"}><img className="col-lg-offset-1 footer-icon img-rounded" src="../app/images/Profile.png"></img></a>
              <a href={"#justforme/"}><img className="col-lg-offset-1 footer-icon img-rounded" src="../app/images/Quote Gen.png"></img></a>
              <a href={"#journal/"}><img className="col-lg-offset-1 footer-icon img-rounded" src="../app/images/Journal.png"></img></a>
              <a href={"#post/"}><img className="col-lg-offset-1 footer-icon img-rounded" src="../app/images/Mood Tracker.png"></img></a>
            </div>
          </div>
        </div>
    )
  }
});


module.exports = {
  TemplateComponent: TemplateComponent
};
