var React = require('react');
var Backbone = require('backbone');
var SplitButton = require('react-bootstrap/lib/SplitButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var $ = require('jquery');
var QuoteCollection = require('../models/randomquotes').QuoteCollection;


var GeneratorContainer = React.createClass({
  getInitialState: function(){
    return {
      mood: {'label': ''},
      event: {'label': ''},
      looking: {'label': ''},
      keyword: {'label': ''},
      quoteCollection: new QuoteCollection()
    }
  },
  componentWillMount: function(){
    var self = this;
    var quoteCollection = this.state.quoteCollection;
    var quoteList = quoteCollection.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(response){
      self.setState({quoteCollection: response.results})
    });
  },
  handleSelect: function(e){
    e.preventDefault();
    var stateObject = {};

    // Set the droplist state to a selection object
    stateObject[e.target.type] = {
      'label': e.target.textContent,
      'value': e.target.dataset.option
    };

    this.setState(stateObject);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var quoteCollection = this.state.quoteCollection;
    var quotes = quoteCollection.map(function(data){
      if(data.keywords.includes('anxious') && data.keywords.includes('happy')){
        return data;
      };
    });
    console.log(quotes);

  },
  render: function(){
    var stateObject = this.state.stateObject;
    return (
      <TemplateComponent>
        <h1>Find me something for me!</h1>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <h3>What is my current mood?</h3>

          <SplitButton title="I'm feeling..." id="bg-nested-dropdown" bsStyle="info">
            <MenuItem type="mood" onSelect={this.handleSelect} data-option="happy" name="content/calm" eventKey={1}>content/calm</MenuItem>
              <MenuItem divider />
            <MenuItem type="mood" onSelect={this.handleSelect} data-option="dumb" name="dumb/inadequate" eventKey={2}>dumb/inadequate</MenuItem>
              <MenuItem divider />
            <MenuItem type="mood" onSelect={this.handleSelect} data-option="proud" name="proud/pumped" eventKey={3}>proud/pumped</MenuItem>
              <MenuItem divider />
            <MenuItem type="mood" onSelect={this.handleSelect} data-option="anxious" name ="worried/stressed" eventKey={4}>worried/stressed</MenuItem>
              <MenuItem divider />
            <MenuItem type="mood" onSelect={this.handleSelect} data-option="productive" name="in the groove/productive" eventKey={5}>in the groove/productive</MenuItem>
              <MenuItem divider />
            <MenuItem type="mood" onSelect={this.handleSelect} data-option="unproductive" name="lazy/unproductive" eventKey={6}>lazy/unproductive</MenuItem>
          </SplitButton>
          Selection: {this.state.mood.label}

          <h3>What happened?</h3>

          <SplitButton title="Event" id="bg-nested-dropdown" bsStyle="danger">
            <MenuItem type="event" onSelect={this.handleSelect} data-option="happy" name="nothing" eventKey={1}>nothing</MenuItem>
              <MenuItem divider />
            <MenuItem type="event" onSelect={this.handleSelect} data-option="dumb" name="messed up my project" eventKey={2}>messed up my project</MenuItem>
              <MenuItem divider />
            <MenuItem type="event" onSelect={this.handleSelect} data-option="proud" name="new job/promotion" eventKey={3}>new job/promotion</MenuItem>
              <MenuItem divider />
            <MenuItem type="event" onSelect={this.handleSelect} data-option="productive" name="started a new project" eventKey={4}>started a new project</MenuItem>
              <MenuItem divider />
            <MenuItem type="event" onSelect={this.handleSelect} data-option="unproductive" name="I lost myself" eventKey={5}>I lost myself</MenuItem>
              <MenuItem divider />
            <MenuItem type="event" onSelect={this.handleSelect} data-option="anxious" name ="having a rough day" eventKey={6}>having a rough day</MenuItem>
          </SplitButton>
          Selection: {this.state.event.label}

          <h3>What am I looking for?</h3>
          <SplitButton title="Looking For:" id="bg-nested-dropdown" bsStyle="success">
            <MenuItem type="looking" onSelect={this.handleSelect} data-option="anxious" name="something to make me laugh" eventKey={1}>something to make me smile</MenuItem>
              <MenuItem divider />
            <MenuItem type="looking" onSelect={this.handleSelect} data-option="dumb" name="something inspirational" eventKey={2}>something inspirational</MenuItem>
              <MenuItem divider />
            <MenuItem type="looking" onSelect={this.handleSelect} data-option="proud" name="something to give me perspective" eventKey={3}>something to give me perspective</MenuItem>
              <MenuItem divider />
            <MenuItem type="looking" onSelect={this.handleSelect} data-option="unproductive" name="something to keep it real" eventKey={4}>something to keep it real</MenuItem>
              <MenuItem divider />
            <MenuItem type="looking" onSelect={this.handleSelect} data-option="productive" name="some words of wisdom" eventKey={5}>some words of wisdom</MenuItem>
              <MenuItem divider />
            <MenuItem type="looking" onSelect={this.handleSelect} data-option="happy" name="something...just something" eventKey={6}>something...just something</MenuItem>
          </SplitButton>
          Selection: {this.state.looking.label}

          <h3>Use Keywords To Help Indicate What You Are Feeling</h3>
          <SplitButton title="Keywords" id="bg-nested-dropdown" bsStyle="warning">
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="happy" name="happiness" eventKey={1}>happiness</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="anxious" name="uncertainty" eventKey={2}>uncertainty</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="proud" name="excitement" eventKey={3}>excitement</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="dumb" name="despair" eventKey={4}>despair</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="anxious" name="lost" eventKey={5}>lost</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="unproductive" name="uninspired" eventKey={6}>uninspired</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="dumb" name="failure" eventKey={7}>failure</MenuItem>
              <MenuItem divider />
            <MenuItem type="keyword" onSelect={this.handleSelect} data-option="productive" name="confident" eventKey={8}>confident</MenuItem>
          </SplitButton>
          Selection: {this.state.keyword.label}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <input className="btn btn-primary" type="submit" value="Submit"/>
          </div>
        </form>

      </TemplateComponent>

    );
  }
});




module.exports ={
  GeneratorContainer: GeneratorContainer
};
