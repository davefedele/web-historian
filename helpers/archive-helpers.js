var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(error, sites){
    sites = sites.toString().split('\n');
    if(callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback){
  //true or false whether site is in the list
  exports.readListOfUrls(function(sites){
    var found = _.contains(sites, url);
    callback(found);
  });
};

exports.addUrlToList = function(){
  //add user posted url to the sites.txt
};

exports.isURLArchived = function(site, callback){
  fs.readdir(exports.paths.archivedSites, function(archives){
    var found = _.contains(archives, site);
    callback(found);
  });
};

exports.downloadUrls = function(){
  //save the url w/resources to sites folder
};
