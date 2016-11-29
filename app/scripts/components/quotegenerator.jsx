var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var RandomQuoteCollection = require('../models/randomquotes').RandomQuoteCollection;
var QuoteCollection = require('../models/randomquotes').QuoteCollection;
var UserPostCollection = require('../models/public-content').UserPostCollection;
var UserPost = require('../models/public-content').UserPost;
var User = require('../models/user').User;
var _ = require('underscore');

// new
var publicPosts = new UserPostCollection();

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
        $(quote.attributes.content).text() + " " + "--" + (quote.attributes.title)
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


var PublicMessageBoard = React.createClass({
  getInitialState: function(){
    return {
      items: [],
      disableUpVote: false,
      disableDownVote: false
    }
  },
  componentWillMount: function(){
    this._fetchItems();
  },
  _fetchItems: function(){
    var self = this;
    publicPosts.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(){
      self.setState({items: publicPosts});
    });
  },
  handleUpvote: function(post){
    var newVote = post.get('votes') + 1;
    this.handleVote(post, newVote);
  },
  handleDownvote: function(post){
    var self = this;
    var newVote = post.get('votes') - 1;
    this.handleVote(post, newVote);

    if(post.get('votes') === -4){
      post.destroy({headers: {
        "X-Parse-Application-Id": "spidermanparseserver",
        "X-Parse-REST-API-Key": "webslinger"
      }}).done(function(){
        self._fetchItems();
      });
    } else {
      post.set('votes', votes);
      post.save().done(function(){
        self._fetchItems();
      });
    }
  },
  handleVote: function(post, newVote){
    var self = this;
    var voters = post.get('voters');
    // var disableUpVote = this.state.disableUpVote;

    // If this user already voted on this post, bail
    if(voters.indexOf(User.current().get('objectId')) != -1){
      return;
    }

    // Track that the user voted for this post
    voters.push(User.current().get('objectId'));
    post.set('voters', _.uniq(voters));

    // Incriment the votes up and save!
    post.set('votes', newVote);
    post.save().done(function(){
      self.setState({items: self.state.items});
    });
  },
  render: function(){
    var self = this;
    var posts = this.state.items.map(function(post){
      return (
        <li key={post.get('objectId')}>
          {post.get('content')}
          <div className="vote roundrect">
            <div onClick={self.handleUpvote.bind(self, post)} className="increment up"></div>
            <div onClick={self.handleDownvote.bind(self, post)} className="increment down"></div>

            <div className="count">{post.get('votes')}</div>
          </div>

        </li>
      )
    });
    return (
      <div>
        <h1>Public Message Board Here</h1>
        <ul>
          {posts}
        </ul>
      </div>
    );
  }
});

var PublicMessageInput = React.createClass({
  getInitialState: function(){
    return {
      textbox: '',
      userPost: new UserPost(),
      user: User.current()
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
    var user = User.current();
    userPost.set('votes', 0);
    userPost.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
    userPost.save()
    // We have to set textbox to empty string, and then reset the state of the model
    userPost.set('textbox', '');
    this.setState({userPost: userPost});
  },
  render: function(){
    return (
      <div className="">
        <h1>Submit Your Own Positivity For Everyone To See!</h1>
        <form onSubmit={this.handleSubmit} className="form-group">
          <textarea className="form-control" name="content" rows="3" type="text" onChange={this.handleText} value={this.state.userPost.get('textbox')} id="user-public-post" placeholder="Submit Your Own Positivity For Everyone To See!"></textarea>
          <input className="btn btn-primary" type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
});


module.exports = {
  HomeContainer: HomeContainer
};
