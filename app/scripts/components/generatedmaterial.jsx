var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var $ = require('jquery');

var GeneratedMaterial = React.createClass({
  render: function(){
    return (
      <div>
        <h2>Your Generated Material Goes Here</h2>

      </div>
    )
  }
});

module.exports = {
  GeneratedMaterial: GeneratedMaterial
};
