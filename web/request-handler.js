var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require("./http-helpers");
var urlParser = require('url');

var actions = {
  'GET' : function(req, res){
    var parts = urlParser.parse(req.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    helpers.serveAssets(res, urlPath);
  },
  'POST' : function(req, res){
    //collect our data = desired url
    helpers.collectData(req, function(data){
      var site = data.split('=')[1];
      //in sites.txt
      archive.isUrlInList(site, function(exists){
        //yes in our sites.txt
        if(exists){
          //in the archives?
          archive.isURLArchived(site, function(found){
            if(found){
            //yes in archives
              //show it
              console.log("it's in the archives so we're showing it");
              helpers.sendRedirect(res, site);
            }
          });
            //not in archives
              //show loading
        //not in sites.txt
          //add to sites.txt
            //show loading
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if(action){
    action(req, res);
  } else {
    helpers.sendResponse(res, "Not Found", 404);
  }

  // res.end(archive.paths.list);
  // console.log(archive.paths.list);
};