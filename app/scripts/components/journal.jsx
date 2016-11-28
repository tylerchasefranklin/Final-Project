var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var JournalEntry = require('../models/journalentry').JournalEntry;
var JournalCollection = require('../models/journalentry').JournalCollection;

var JournalComposition = React.createClass({
  getInitialState: function(){
    return {
      textbox: '',
      journalEntry: new JournalEntry(),
      entryCollection: new JournalCollection()
    }
  },
  handleText: function(e){
    var journalEntry = this.state.journalEntry;
    journalEntry.set(e.target.name, e.target.value);
    this.setState({journalEntry: journalEntry});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var journalEntry = this.state.journalEntry;
    journalEntry.save();
    journalEntry.set('textbox', '');
    this.setState({journalEntry: journalEntry});
  },
  render: function(){
    return (
      <TemplateComponent>
        <form onSubmit={this.handleSubmit} className="form-group row">
          <h1 className="col-xs-offset-4">Submit A Journal Entry!</h1>
          <label htmlFor="user-public-post" className="col-xs-2 col-form-label">Submit A Journal Entry</label>
          <div className="col-xs-10">
            <textarea className="form-control" rows="10" type="text" onChange={this.handleText} name="entry" value={this.state.journalEntry.get('textbox')} id="user-public-post" placeholder="Submit A Journal Entry"></textarea>
            <input className="btn btn-primary" type="submit" value="Submit"/>
          </div>
        </form>
      </TemplateComponent>
    )
  }
});


module.exports = {
  JournalComposition: JournalComposition
};
