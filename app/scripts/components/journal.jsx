var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var JournalEntry = require('../models/journalentry').JournalEntry;
var JournalCollection = require('../models/journalentry').JournalCollection;

var JournalEntry = React.createClass({
  getInitialState: function(){
    return {
      textbox: '',
      entryCollection: new JournalCollection()
    }
  },
  handleText: function(e){
    var textbox = e.target.value;
    this.setState({textbox: textbox});
  },
  handleSubmit: function(e){
    var textbox = this.state.textbox;
    var journalEntry = new JournalEntry();
    var entryCollection = new JournalCollection();
    entryCollection.create(this.state.textbox);
    console.log({textbox: textbox});


  },
  render: function(){
    return (
      <TemplateComponent>
        <form onSubmit={this.handleSubmit} className="form-group row">
          <h1 className="col-xs-offset-4">Submit A Journal Entry!</h1>
          <label htmlFor="user-public-post" className="col-xs-2 col-form-label">Submit A Journal Entry</label>
          <div className="col-xs-10">
            <textarea className="form-control" rows="10" type="text" onChange={this.handleText} value={this.state.textbox} id="user-public-post" placeholder="Submit A Journal Entry"></textarea>
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </TemplateComponent>
    )
  }
});


module.exports = {
  JournalEntry: JournalEntry
};