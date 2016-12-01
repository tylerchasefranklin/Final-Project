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
       <img className="home-icon col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-4 img-rounded" src="images/Post.png"></img>
       <QuoteGenerator />
       <PublicMessageBoard />
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
        "''" + $(quote.attributes.content).text() + "''" + " " + "--" + (quote.attributes.title)
      )
    });

    return (
      <div id="random-quote" className="well col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

    // Increment the votes up and save!
    post.set('votes', newVote);
    post.save().done(function(){
      self.setState({items: self.state.items});
    });
  },
  render: function(){
    var self = this;
    var posts = this.state.items.map(function(post){
      return (
        <div id="public-post" className="well col-xs-12" key={post.get('objectId')}>
            <div id="public-message" className="col-xs-8">
              "{post.get('content')}"
            </div>
            <div className="col-xs-1 col-xs-offset-1 col-lg-offset-3 col-md-offset-2 col-sm-offset-2 vote roundrect">
              <div onClick={self.handleUpvote.bind(self, post)} className="increment up"></div>
              <div onClick={self.handleDownvote.bind(self, post)} className="increment down"></div>
              <div className="count">{post.get('votes')}</div>
            </div>
        </div>
      )
    });
    return (
      <div id="message-board" className="container">
        <h1 id="message-board">Public Message Board</h1>
        <br></br>
        <div className="row">
          {posts}
        </div>
      </div>
    );
  }
});

// var PublicMessageInput = React.createClass({
//   getInitialState: function(){
//     return {
//       userPost: new UserPost(),
//       user: User.current()
//     }
//   },
//   componentWillMount: function(){
//     var user = localStorage.username;
//     // console.log('user', user);
//   },
//   handleText: function(e){
//     //This is simultaneously taking the input, and setting it to collection and state
//     var userPost = this.state.userPost;
//     // console.log(userPost);
//     userPost.set(e.target.name, e.target.value);
//     this.setState({userPost: userPost});
//   },
//   handleSubmit: function(e){
//     e.preventDefault();
//     var userPost = this.state.userPost;
//     var user = User.current();
//     userPost.set('votes', 0);
//     userPost.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
//     userPost.save()
//     // We have to set textbox to empty string, and then reset the state of the model
//     userPost.set('textbox', '');
//     this.setState({userPost: userPost});
//
//   },
//   render: function(){
//     return (
//       <div className="col-lg-6">
//         <h1>Submit Your Own Positivity For Everyone To See!</h1>
//         <form onSubmit={this.handleSubmit} className="form-group">
//           <textarea className="form-control" name="content" rows="3" type="text" onChange={this.handleText} value={this.state.userPost.get('textbox')} id="user-public-post" placeholder="Submit Your Own Positivity For Everyone To See!"></textarea>
//           <input className="btn btn-primary" type="submit" value="Submit"/>
//         </form>
//       </div>
//     );
//   }
// });


module.exports = {
  HomeContainer: HomeContainer
};
