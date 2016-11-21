var React = require('react');
var Backbone = require('backbone');
var SplitButton = require('react-bootstrap/lib/SplitButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var $ = require('jquery');


var GeneratorContainer = React.createClass({
  render: function(){
    return (
      <TemplateComponent>
        <h1>Find me something for me!</h1>
        <CurrentMood />
        <EventLogger />
        <WhatYouNeed />
        <Keywords />
      </TemplateComponent>

    );
  }
});

var CurrentMood = React.createClass({

  render: function(){
    return (
      <div>
        <h3>What is my current mood?</h3>

        <SplitButton title="Current Mood" id="bg-nested-dropdown" bsStyle="info">
          <MenuItem eventKey="1">content/calm</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="2">sad/down</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="3">love/elated</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="4">heartbroken/alone</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="5">worried/stressed</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="6">proud/pumped</MenuItem>
        </SplitButton>


      </div>
    );
  }
});



var EventLogger = React.createClass({
  render: function(){
    return (
      <div>
        <h3>What happened?</h3>

        <SplitButton title="Event" id="bg-nested-dropdown" bsStyle="danger">
          <MenuItem eventKey="1">nothing</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="2">break-up</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="3">new job/promotion</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="4">death of family member/friend</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="5">new relationship/married</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="6">just having a rough day</MenuItem>
        </SplitButton>

      </div>
    );
  }
});

var WhatYouNeed = React.createClass({
  render: function(){
    return (
      <div>
        <h3>What am I looking for?</h3>
        <SplitButton title="Looking For:" id="bg-nested-dropdown" bsStyle="success">
          <MenuItem eventKey="1">something to make me laugh</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="2">something inspirational</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="3">something to give me perspective</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="4">something to make me feel not alone</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="5">something I can cry to</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="6">something to keep it real</MenuItem>
        </SplitButton>
      </div>
    )
  }
});

var Keywords = React.createClass({
  render: function(){
    return (
      <div>
        <h3>Use Keywords To Help Indicate What You Are Feeling</h3>
        <SplitButton title="Keywords" id="bg-nested-dropdown" bsStyle="warning">
          <MenuItem eventKey="1">joy</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="2">depression</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="3">excitement</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="4">despair</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="5">happiness</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="6">loneliness</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="7">pride</MenuItem>
            <MenuItem divider />
          <MenuItem eventKey="8">hurt/pain</MenuItem>
        </SplitButton>
      </div>  
    )
  }
});


module.exports ={
  GeneratorContainer: GeneratorContainer
};
