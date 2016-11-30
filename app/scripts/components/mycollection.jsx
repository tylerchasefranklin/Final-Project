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
      myCollection: new MaterialCollection()
    }
  },
  componentWillMount: function(){
    var self = this;
    // console.log(user.attributes.objectId);
    this.state.myCollection.fetch({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(){
      self.setState({myCollection: self.state.myCollection});
    });
  },
  handleDelete: function(item){
    console.log(item);
    var self = this;

    item.destroy({headers: {
      "X-Parse-Application-Id": "spidermanparseserver",
      "X-Parse-REST-API-Key": "webslinger"
    }}).then(function(){
      self.setState({myCollection: self.state.myCollection});
    });
  },
  render: function(){
    var myCollection = this.state.myCollection;
    var user = this.state.user;
    var self = this;
    var userId = user.attributes.objectId;
    var myMaterials = myCollection.map(function(item){
      console.log(item);
      if(userId === item.get('user').objectId){
        return (
          <div className="col-lg-10 collection-item" key={item.get('objectId')}>
            {item.get('content')}{item.get('author')}
            <form className="col-lg-2">
              <input onClick={function(){self.handleDelete(item)}} className="btn btn-primary" type="delete" defaultValue="Delete"/>
            </form>
          </div>
        );
      };
    });
    return(
      <TemplateComponent>
        <h1 className="collection-title">My Collection</h1>
        <div className="well col-lg-10 col-lg-offset-1">
            {myMaterials}
        </div>
      </TemplateComponent>
    )
  }
});


module.exports = {
  MyCollection: MyCollection
};
