const  fs = require("fs");
const watch = require("watch");
const Log =  require("log");
const fse = require("fs-extra");
const path = require("path");

const log = new Log('debug', fs.createWriteStream('./log/watch.log'));
arguments = process.argv.splice(2);

var dir = arguments.length > 0 ? arguments[0] : "." + path.sep
watch.watchTree(dir,{
  //ignoreDirectoryPattern: "./log/"
}, function (f, curr, prev) {
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
    var paths = f.split(path.sep);
    if(paths.length < 2){
      fse.remove(f);
      log.info(f + " was removed"); 
    }

  } else if (curr.nlink === 0) {
    // f was removed
  } else {
    // f was changed
    //log.info("f was changed"); 
  }
})