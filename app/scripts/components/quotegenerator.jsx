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
      publicposts: new UserPostCollection()
    }
  },
  render: function(){
    return (
      <h1>Public Message Board Here</h1>
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
    console.log('user', user);
  },
  handleText: function(e){
    var textbox = e.target.value;
    this.setState({textbox: textbox});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userPost = new UserPost();
    var user = new User();
    var textbox = this.state.textbox;


  },
  render: function(){
    return (
      <div className="form-group">
        <h1>Submit Your Own Positivity For Everyone To See!</h1>
        <div className="">
          <textarea className="form-control" rows="10" type="text" onChange={this.handleText} value={this.state.textbox} id="user-public-post" placeholder="Submit Your Own Positivity For Everyone To See!"></textarea>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    );
  }
});


module.exports = {
  HomeContainer: HomeContainer
};
