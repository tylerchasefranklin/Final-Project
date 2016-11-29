var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var TemplateComponent = require('./template.jsx').TemplateComponent;
var User = require('../models/user').User;
var MaterialCollection = require('../models/usercollection').MaterialCollection;

var MyCollection = React.createClass({
  getInitialState: function(){
    return {
      user: User.current(),
      myCollection: []
    }
  },
  componentWillMount: function(){
    var materialCollection = new MaterialCollection();
    var self = this;
    // console.log(user.attributes.objectId);
    var myCollection = materialCollection.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(response){
      self.setState({myCollection: response.results});
    });
  },
  handleDelete: function(item){
    console.log(item);
  },
  render: function(){
    var myCollection = this.state.myCollection;
    var user = this.state.user;
    var userId = user.attributes.objectId;
    var myMaterials = myCollection.map(function(item){
      console.log(item);
      if(userId === item.user.objectId){
        return (
          <div key={item.objectId}>
            <div>
              {item.content}{item.author}
            </div>
            <form>
              <input className="btn btn-primary" type="delete" defaultValue="Delete"/>
            </form>
          </div>
        );
      };
    });
    return(
      <TemplateComponent>
        {myMaterials} 
      </TemplateComponent>
    )
  }
});


module.exports = {
  MyCollection: MyCollection
};
