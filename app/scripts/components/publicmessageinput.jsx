var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var UserMaterial = require('../models/usercollection').UserMaterial;
var MaterialCollection = require('../models/usercollection').MaterialCollection;
var UserPost = require('../models/public-content').UserPost;
var User = require('../models/user').User;

var UserPostInput = React.createClass({
  getInitialState: function(){
    return {
      newState: {},
    }
  },
  handleInput: function(e){
    var inputField = e.target;
    var newState = {};
    newState[inputField.name] = inputField.value;
    console.log(newState);
    this.setState(newState);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var user = User.current();
    var userPost = new UserPost();
    var userMaterial = new UserMaterial();
    var clickValue = this.state.type;
    console.log(clickValue);
    var newState = this.state;
    console.log(newState);
    if(clickValue === "public"){
      userPost.set(newState);
      userPost.set('votes', 0);
      userPost.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
      userPost.save();
      this.setState({userPost: userPost});
    };
    if(clickValue === "private"){
      userMaterial.set(newState);
      userMaterial.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
      userMaterial.save();
      this.setState({userMaterial: userMaterial});
    };

  },
  render: function(){
    return (
      <TemplateComponent>
        <form onSubmit={this.handleSubmit} className="form-group row">
          <h1>Submit Your Own Positivity For Everyone To See!</h1>
          <label htmlFor="user-public-post" className="col-xs-2 col-form-label">Submit Your Own Positivity For Everyone To See!</label>
          <div className="col-xs-10">
            <textarea onChange={this.handleInput} name="content" className="form-control" rows="10" type="text" value={this.state.content} id="user-public-post" placeholder="Submit Your Own Positivity For Everyone To See!"></textarea>
              <label htmlFor="private" className="radio-inline">Private</label>
                <input onClick={this.handleInput} type="radio" name="type" value="private"/>
              <label htmlFor="public" className="radio-inline">Public</label>
                <input onClick={this.handleInput} type="radio" name="type" value="public" />
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </TemplateComponent>
    );
  }
});

module.exports = {
  UserPostInput: UserPostInput
};
