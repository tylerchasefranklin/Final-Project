var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var QuoteGenerator = React.createClass({
  render: function(){
    var quotes = $.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40').then(function(response){
      console.log('response', response);
      response.map(function(quote){
        console.log('quote', quote);
        return (
          <p>{quote.title}</p>
        )
      })
    });
    // {quotes}, React doesn't like this!!!
    return (
      <div>
        <PublicMessageBoard />
        <PublicMessageInput />
      </div>
    )
  }
});

var PublicMessageBoard = React.createClass({
  render: function(){
    return (
      <h1>Public Message Board Here</h1>
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
    console.log(textbox);
    this.setState({textbox: textbox});
  },
  render: function(){
    return (
      <div className="form-group row">
        <h1>Submit Your Own Positivity For Everyone To See!</h1>
        <label htmlFor="user-public-post" className="col-xs-2 col-form-label">Submit Your Own Positivity For Everyone To See!</label>
        <div className="col-xs-10">
          <textarea className="form-control" rows="15" type="text" onChange={this.handleText} value={this.state.textbox} id="user-public-post" placeholder="Submit Your Own Positivity For Everyone To See!"></textarea>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    );
  }
});


module.exports = {
  QuoteGenerator: QuoteGenerator
};
