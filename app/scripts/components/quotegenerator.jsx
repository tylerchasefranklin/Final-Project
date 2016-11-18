var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var RandomQuoteCollection = require('../models/randomquotes').RandomQuoteCollection;
var QuoteCollection = require('../models/randomquotes').QuoteCollection;
var UserPostCollection = require('../models/public-content').UserPostCollection;
var UserPost = require('../models/public-content').UserPost;
var User = require('../models/user').User;

var HomeContainer = React.createClass({
 render: function(){
   return (
     <TemplateComponent>
       <QuoteGenerator />
       <PublicMessageBoard />
       <PublicMessageInput />
     </TemplateComponent>
   )
 }
});




var QuoteGenerator = React.createClass({
  getInitialState: function(){
    return {
      quoteCollection: new RandomQuoteCollection(),
    };
  },
  componentWillMount: function(){
    var quoteCollection = this.state.quoteCollection;
    var self = this;
    quoteCollection.fetch().then(function(response){
      self.setState({quoteCollection: quoteCollection});
    });
  },
  render: function(){
    var quoteCollection = this.state.quoteCollection;
    var dailyQuote = quoteCollection.map(function(quote){
      return (
        $(quote.attributes.content).text()
      )
    });

    return (
      <div>
        <h1>Daily Quote</h1>
        {dailyQuote}
      </div>
    )
  }
});

// var RandomDailyMaterial = React.createClass({
//   render: function(){
//     return (
//       <div className="well">Randomly Generated Material Goes Here</div>
//     )
//   }
// });

var PublicMessageBoard = React.createClass({
  getInitialState: function(){
    return {
      publicPosts: new UserPostCollection(),
    }
  },
  componentWillMount: function(){
    var publicPosts = this.state.publicPosts;
    var self = this;
    var posts = publicPosts.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(response){
      self.setState({publicPosts: response.results})
    });
  },
  render: function(){
    var publicPosts = this.state.publicPosts;
    console.log(publicPosts);
    var posts = publicPosts.map(function(post){
      return (
        <li key={post.objectId}>{post.content}</li>
      )
    });
    return (
      <div>
        <h1>Public Message Board Here</h1>
        <ul>{posts}</ul>
      </div>
    );
  }
});

var PublicMessageInput = React.createClass({
  getInitialState: function(){
    return {
      textbox: '',
      userPost: new UserPost(),
      user: new User()
    }
  },
  componentWillMount: function(){
    var user = localStorage.username;
    // console.log('user', user);
  },
  handleText: function(e){
    //This is simultaneously taking the input, and setting it to collection and state
    var userPost = this.state.userPost;
    // console.log(userPost);
    userPost.set(e.target.name, e.target.value);
    this.setState({userPost: userPost});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userPost = this.state.userPost;
    var user = new User();
    userPost.save();
    // We have to set textbox to empty string, and then reset the state of the model
    userPost.set('textbox', '');
    this.setState({userPost: userPost});
  },
  render: function(){
    return (
      <div className="">
        <h1>Submit Your Own Positivity For Everyone To See!</h1>
        <form onSubmit={this.handleSubmit} className="form-group">
          <textarea className="form-control" name="content" rows="10" type="text" onChange={this.handleText} value={this.state.userPost.get('textbox')} id="user-public-post" placeholder="Submit Your Own Positivity For Everyone To See!"></textarea>
          <input className="btn btn-primary" type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
});


module.exports = {
  HomeContainer: HomeContainer
};
