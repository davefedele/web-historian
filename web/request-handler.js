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
      //in sites.txt?
      archive.isUrlInList(site, function(exists){
        console.log("yes site is in sites.txt ->", site);
        if(exists){
          //in the archives?
          archive.isURLArchived(site, function(found){
            if(found){
              console.log("yes site archived ->", site);
              helpers.sendRedirect(res, site);
            } else{
              console.log("no site not archived  redirecting to loading ->", site);
              helpers.sendRedirect(res, 'loading.html');
            }
          });
        } else{
            console.log("no site is not in sites.txt ->", site);
            console.log("adding site to sites.txt ->", site);
            archive.addUrlToList(site, function(file){
              console.log(site + " added to " + file);
              //show loading
              helpers.sendRedirect(res, 'loading.html');
            });
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