var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require("./http-helpers");

var actions ={
  'GET' : helpers.serveAssets 
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  if(action){
    var filePath = '.' + req.url;
    action(res, filePath, helpers.sendResponse);
  } else {
    helpers.sendResponse(res, "Not Found", 404);
  }

  // res.end(archive.paths.list);
};