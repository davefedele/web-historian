var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};

  fs.readFile( archive.paths.siteAssets + asset, encoding, function(error, content){
    if (error){ //if can't read public
      fs.readFile( archive.paths.archivedSites + asset, encoding, function(error, content){
        if(error){ //if can't read archivedSites
          callback ? callback() : exports.sendResponse(res, "File not found", 404);
        } else{ //if we can read the archived Sites file
          exports.sendResponse(res, content);
        }
      });
    } else{ //if it can read the public site
      exports.sendResponse(res, content);
    }
  });
};

exports.sendResponse = function(res, data, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.sendRedirect = function(res, redirectUrl, statusCode){
  statusCode = statusCode || 302;
  res.writeHead(statusCode, {Location: redirectUrl});
  res.end();
};

exports.collectData = function(req, callback){
  var data = "";
  req.on("data", function(chunk){
    data += chunk;
  });
  req.on("end", function(){
    callback(data);
  });
};