var React = require('react');
var Backbone = require('backbone');
var TemplateComponent = require('./template.jsx').TemplateComponent;

var ChatContainer = React.createClass({
  render: function(){
    return (
      <TemplateComponent>
        <section>
          <div className="col-md-10">
            <div>
              Message Window
            </div>
          </div>
        </section>
      </TemplateComponent>
    );
  }
});



module.exports = {
  ChatContainer: ChatContainer
};
