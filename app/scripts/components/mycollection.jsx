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
          <div className="well col-xs-12 collection-item" key={item.get('objectId')}>
            <div className="col-xs-9">
              {item.get('content')}{item.get('author')}
            </div>
            <form className="col-xs-2 col-xs-offset-1 col-lg-1 col-lg-offset-2 col-md-1 col-md-offset-2 col-sm-1 col-sm-offset-1">
              <input onClick={function(){self.handleDelete(item)}} id="collection-button" className="btn btn-danger" type="delete" defaultValue="Delete"/>
            </form>
          </div>
        );
      };
    });
    return(
      <TemplateComponent>
        <div id="collection" className="container">
          <div className="row">
            <h1 className="collection-title">My Collection</h1>
            <div className="col-xs-12">
                {myMaterials}
            </div>
          </div>
        </div>
      </TemplateComponent>
    )
  }
});


module.exports = {
  MyCollection: MyCollection
};
