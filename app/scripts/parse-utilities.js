var Backbone = require('backbone');
var $ = require('jquery');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(attributes, options){
    options = options || {};
    attributes = attributes || {};

    this.set(attributes);

    options.beforeSend = function(request){
      request.setRequestHeader('X-Parse-Application-Id', 'spidermanparseserver');
      request.setRequestHeader('X-Parse-REST-API-Key', 'webslinger');
      if (localStorage.getItem('token')){
        request.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('token'));
      }
    };

    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.call(this, arguments, options);
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if (this.whereClause.field){
      var field = this.whereClause.field;
      delete this.whereClause.field;
      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
    }

    return url;
  },
  parse: function(data){
    return data.results;
  }
});


module.exports = {
  ParseModel: ParseModel,
  ParseCollection: ParseCollection
};
