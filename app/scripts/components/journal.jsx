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
    this.setState(newState);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var newState = this.state;
    var user = this.state.user;
    var journalEntry = new JournalEntry();
    journalEntry.set(newState);
    journalEntry.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
    journalEntry.save();
  },
  render: function(){
    return (
      <TemplateComponent>
        <div id="journal" className="col-lg-12">
          <h1 className="journal-title">Submit A Journal Entry!</h1>
          <br></br>
          <br></br>
          <div>
            <form onSubmit={this.handleSubmit} className="col-lg-6 col-lg-offset-3 form-group">
              <div className="">
                <textarea id="journal-text" className="form-control" rows="10" type="text" onChange={this.handleInput} name="entry" value={this.state.entry} placeholder="Submit A Journal Entry"></textarea>
              </div>
              <div className="form-group">
                <h3 className="mood-title">My Current Mood</h3>
                <input className="form-control" onChange={this.handleInput} name="mood" value={this.state.mood} id="mood" type="mood"  placeholder="My Current Mood" />
              </div>
              <input className="btn btn-primary" type="submit" value="Submit"/>
            </form>
          </div>
        </div>
        <h2 className="journal-entries-title">My Journal Entries</h2>
        <MyJournalEntries user={this.state.user}/>
      </TemplateComponent>
    )
  }
});

var MyJournalEntries = React.createClass({
  getInitialState: function(){
    return {
      myJournalEntries: []
    }
  },
  componentWillMount: function(){
    var journalEntries = new JournalCollection();
    var self = this;
    var myJournalEntries = journalEntries.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(response){
      self.setState({myJournalEntries: response.results});
    })
  },
  render: function(){
    var myJournalEntries = this.state.myJournalEntries;
    var user = this.props.user;
    var userId = user.attributes.objectId;
    var myEntries = myJournalEntries.map(function(entry){
      if(userId === entry.user.objectId){
        return (
          <div className="well" key={entry.objectId}>
            <p>Entry: {entry.entry}</p>
            <div>Mood: {entry.mood}</div>
          </div>
        )
      }
    })
    return (
      <div className="well col-lg-12">
        {myEntries}
      </div>

    )
  }
});




module.exports = {
  JournalComposition: JournalComposition
};
