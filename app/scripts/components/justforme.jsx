var React = require('react');
var Backbone = require('backbone');
var SplitButton = require('react-bootstrap/lib/SplitButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var $ = require('jquery');
var QuoteCollection = require('../models/randomquotes').QuoteCollection;
var UserMaterial = require('../models/usercollection').UserMaterial;
var User = require('../models/user').User;

var GeneratorContainer = React.createClass({
  getInitialState: function(){
    return {
      mood: {'label': ''},
      event: {'label': ''},
      looking: {'label': ''},
      keyword: {'label': ''},
      quoteCollection: new QuoteCollection(),
      user: User.current()
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
    var selector = this.state;
    var quoteCollection = this.state.quoteCollection;
    var quotes = quoteCollection.filter(function(data){
      if(selector.mood.value === undefined){
        throw alert("Please select your mood");
      };
      if(selector.event.value === undefined){
        throw alert("Please select an event");
      };
      if(selector.looking.value === undefined){
        throw alert("Please select what you are looking for");
      };
      if(selector.keyword.value === undefined){
        throw alert("Please select a keyword");
      };
      if(data.keywords.includes(selector.mood.value) && data.keywords.includes(selector.event.value) && data.keywords.includes(selector.looking.value) && data.keywords.includes(selector.keyword.value)){
        return data;
      };
    });

    var selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // this.setState({selectedQuote: selectedQuote});
    this.setState({selectedContent: "''" + ($(selectedQuote.content).text()) + "''"});
    this.setState({selectedAuthor: '--' + selectedQuote.title});
  },
  handleSave: function(e){
    e.preventDefault();
    var selectedContent = this.state.selectedContent;
    var selectedAuthor = this.state.selectedAuthor;
    var user = this.state.user;
    var userMaterial = new UserMaterial();
    userMaterial.set({content: selectedContent});
    userMaterial.set({author: selectedAuthor});
    userMaterial.set('user', {"__type":"Pointer","className":"_User","objectId":(user.get("objectId"))});
    userMaterial.save();
  },
  render: function(){
    var stateObject = this.state.stateObject;
    var selectedContent = this.state.selectedContent;
    var selectedAuthor = this.state.selectedAuthor;
    return (
      <TemplateComponent>
        <div id="justforme" className="container">
          <img className="quote-icon col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-4 img-rounded" src="images/Quote Gen.png"></img>
          <div className="row">
            <div className="col-xs-12 col-lg-12">
              <h1 className="special-quote-title">Looking For A Particular Kind of Quote?</h1>
              <h5 className="special-quote-title">*Hit "Find Me A Quote" Again For A Different Quote*</h5>
              <br></br>
              <br></br>
              <div className="col-xs-6 col-lg-6">
                <form className="form-group" onSubmit={this.handleSubmit}>
                  <h3>What is my current mood?</h3>

                  <SplitButton title="I'm feeling..." id="bg-nested-dropdown" bsStyle="info">
                    <MenuItem className="mood-item" type="mood" onSelect={this.handleSelect} data-option="happy" name="content/calm" eventKey={1}>content/calm</MenuItem>
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
                    <input className="btn btn-primary" type="submit" value="Find Me A Quote!"/>
                  </div>
                </form>
              </div>
              <form onSubmit={this.handleSave} id="special-quote-box" className="well col-xs-6 col-lg-6">
                <div id="special-quote">
                  {selectedContent}
                  <br></br>
                  <br></br>
                  {selectedAuthor}
                  <br></br>
                </div>
                <input id="special-quote-button" className="btn btn-primary" type="submit" value="Save This Quote" />
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </TemplateComponent>

    );
  }
});




module.exports ={
  GeneratorContainer: GeneratorContainer
};
