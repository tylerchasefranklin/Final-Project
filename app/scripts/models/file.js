var Backbone = require('backbone');

var FileModel = Backbone.Model.extend({
  defaults: {
    name: 'default.jpg'
  },
  urlRoot: function(){
    var url = 'https://spider-man-server.herokuapp.com/Files';
    return url + encodeURIComponent(this.get('name'));
  },
  save: function(attributes, options){
    options = options || {};
    attributes = attributes || {};

    this.set(attributes);

    var image = this.get('data');

    options.data = image;
    options.beforeSend = function(request){
      request.setRequestHeader('X-Parse-Application-Id', 'spidermanparseserver');
      request.setRequestHeader('X-Parse-REST-API-Key', 'webslinger');
      request.setRequestHeader('Content-Type', image.type);
    };
    options.processData = false;
    options.contentType = false;

    return Backbone.Model.prototype.save.call(this, attributes, options);
  },
});

var FileCollection = Backbone.Collection.extend({
  model: FileModel,
  url: 'https://spider-man-server.herokuapp.com/Files'
});




module.exports = {
  FileModel: FileModel
};
