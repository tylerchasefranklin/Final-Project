var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var JournalEntry = require('../models/journalentry').JournalEntry;
var JournalCollection = require('../models/journalentry').JournalCollection;
var User = require('../models/user').User;

var JournalComposition = React.createClass({
  getInitialState: function(){
    return {
      newState: {},
      user: User.current(),
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
    var newState = this.state;
    var user = this.state.user;
    var journalEntry = new JournalEntry();
    console.log('props', user);
    console.log(newState);
    journalEntry.set(newState);
    journalEntry.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
    journalEntry.save();
  },
  render: function(){
    return (
      <TemplateComponent>
        <form onSubmit={this.handleSubmit} className="form-group row">
          <h1 className="col-xs-offset-4">Submit A Journal Entry!</h1>
          <label htmlFor="user-public-post" className="col-xs-2 col-form-label">Submit A Journal Entry</label>
          <div className="col-xs-10">
            <textarea className="form-control" rows="10" type="text" onChange={this.handleInput} name="entry" value={this.state.entry} id="user-public-post" placeholder="Submit A Journal Entry"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="name">My Current Mood</label>
            <input className="form-control" onChange={this.handleInput} name="mood" value={this.state.mood} id="mood" type="mood"  placeholder="My Current Mood" />
          </div>
          <input className="btn btn-primary" type="submit" value="Submit"/>
        </form>
      </TemplateComponent>
    )
  }
});




module.exports = {
  JournalComposition: JournalComposition
};
