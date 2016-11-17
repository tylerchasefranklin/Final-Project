var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var RandomQuoteCollection = require('../models/randomquotes').RandomQuoteCollection;
var QuoteCollection = require('../models/randomquotes').QuoteCollection;

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
      console.log('response', response);
      self.setState({quoteCollection: quoteCollection});
    });
  },
  render: function(){
    var quoteCollection = this.state.quoteCollection;
    console.log(quoteCollection);
    var dailyQuote = quoteCollection.map(function(quote){
      console.log(quote);

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
  render: function(){
    return (
      <h1 className="col-xs-offset-3">Public Message Board Here</h1>
    );
  }
});

var PublicMessageInput = React.createClass({
  getInitialState: function(){
    return {
      textbox: ''
    }
  },
  handleText: function(e){
    var textbox = e.target.value;
    this.setState({textbox: textbox});
  },
  render: function(){
    return (
      <div className="form-group row">
        <h1 className="col-xs-offset-2">Submit Your Own Positivity For Everyone To See!</h1>
        <label htmlFor="user-public-post" className="col-xs-1 col-form-label">Submit Your Own Positivity For Everyone To See!</label>
        <div className="col-xs-10">
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
