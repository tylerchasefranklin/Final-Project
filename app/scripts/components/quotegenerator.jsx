var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var QuoteGenerator = React.createClass({
  componentWillMount: function(){
    $.get('http://quotes.rest/qod.json?category=inspire').then(function(response){
      console.log(response);
    });
  },
  render: function(){
    return (
      <h1>Future Quote Generator</h1>
    );
  }
});



module.exports = {
  QuoteGenerator: QuoteGenerator
};
