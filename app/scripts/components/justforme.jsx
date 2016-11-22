var React = require('react');
var Backbone = require('backbone');
var SplitButton = require('react-bootstrap/lib/SplitButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var $ = require('jquery');


var GeneratorContainer = React.createClass({
  getInitialState: function(){
    return {
      mood: {'label': ''},
      event: {'label': ''},
      looking: {'label': ''},
      keyword: {'label': ''}
    }
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


  },
  render: function(){
    var stateObject = this.state.stateObject;
    return (
      <TemplateComponent>
        <h1>Find me something for me!</h1>
        <form className="form-group">
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

// var CurrentMood = React.createClass({
//   getInitialState: function(){
//     return {
//       selection: ''
//     }
//   },
//   handleSelect: function(e){
//     e.preventDefault();
//     var selection = e.target.name;
//     // console.log(selection);
//     this.setState({selection: selection});
//     // console.log('selection', {selection});
//   },
//   render: function(){
//     var selection = this.state.selection;
//     console.log(selection);
//     return (
//       <div className="form-group">
//         <h3>What is my current mood?</h3>
//
//         <SplitButton title="Current Mood" data-option="bg-nested-dropdown" bsStyle="info">
//           <MenuItem onSelect={this.handleSelect} name="content/calm" eventKey={1}>content/calm</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="sad/down" eventKey={2}>sad/down</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="love/elated" eventKey={3}>love/elated</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name ="heartbroken/alone" eventKey={4}>heartbroken/alone</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="worried/stressed" eventKey={5}>worried/stressed</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="proud/pumped" eventKey={6}>proud/pumped</MenuItem>
//         </SplitButton>
//         Selection: {selection}
//
//       </div>
//     );
//   }
// });
//
//
//
// var EventLogger = React.createClass({
//   getInitialState: function(){
//     return {
//       selection: ''
//     }
//   },
//   handleSelect: function(e){
//     e.preventDefault();
//     var selection = e.target.name;
//     // console.log(selection);
//     this.setState({selection: selection});
//     // console.log('selection', {selection});
//   },
//   render: function(){
//     var selection = this.state.selection;
//     console.log(selection);
//     return (
//       <div className="form-group">
//         <h3>What happened?</h3>
//
//         <SplitButton title="Event" data-option="bg-nested-dropdown" bsStyle="danger">
//           <MenuItem onSelect={this.handleSelect} name="nothing" eventKey={1}>nothing</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="break-up" eventKey={2}>break-up</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="new job/promotion" eventKey={3}>new job/promotion</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="death of family member/friend" eventKey={4}>death of family member/friend</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="new relationship/married" eventKey={5}>new relationship/married</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name ="just having a rough day" eventKey={6}>just having a rough day</MenuItem>
//         </SplitButton>
//         Selection: {selection}
//       </div>
//     );
//   }
// });
//
// var WhatYouNeed = React.createClass({
//   getInitialState: function(){
//     return {
//       selection: ''
//     }
//   },
//   handleSelect: function(e){
//     e.preventDefault();
//     var selection = e.target.name;
//     // console.log(selection);
//     this.setState({selection: selection});
//     // console.log('selection', {selection});
//   },
//   render: function(){
//     var selection = this.state.selection;
//     console.log(selection);
//     return (
//       <div className="form-group">
//         <h3>What am I looking for?</h3>
//         <SplitButton title="Looking For:" data-option="bg-nested-dropdown" bsStyle="success">
//           <MenuItem onSelect={this.handleSelect} name="something to make me laugh" eventKey={1}>something to make me laugh</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="something inspirational" eventKey={2}>something inspirational</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="something to give me perspective" eventKey={3}>something to give me perspective</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="something to make me feel not alone" eventKey={4}>something to make me feel not alone</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="something I can cry to" eventKey={5}>something I can cry to</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="something to keep it real" eventKey={6}>something to keep it real</MenuItem>
//         </SplitButton>
//         Selection: {selection}
//       </div>
//     )
//   }
// });
//
// var Keywords = React.createClass({
//   getInitialState: function(){
//     return {
//       selection: ''
//     }
//   },
//   handleSelect: function(e){
//     e.preventDefault();
//     var selection = e.target.name;
//     // console.log(selection);
//     this.setState({selection: selection});
//     // console.log('selection', {selection});
//   },
//   render: function(){
//     var selection = this.state.selection;
//     console.log(selection);
//     return (
//       <div className="form-group">
//         <h3>Use Keywords To Help Indicate What You Are Feeling</h3>
//         <SplitButton title="Keywords" data-option="bg-nested-dropdown" bsStyle="warning">
//           <MenuItem onSelect={this.handleSelect} name="joy" eventKey={1}>joy</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="depression" eventKey={2}>depression</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="excitement" eventKey={3}>excitement</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="despair" eventKey={4}>despair</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="happiness" eventKey={5}>happiness</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="loneliness" eventKey={6}>loneliness</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="pride" eventKey={7}>pride</MenuItem>
//             <MenuItem divider />
//           <MenuItem onSelect={this.handleSelect} name="hurt/pain" eventKey={8}>hurt/pain</MenuItem>
//         </SplitButton>
//         Selection: {selection}
//       </div>
//     )
//   }
// });


module.exports ={
  GeneratorContainer: GeneratorContainer
};
