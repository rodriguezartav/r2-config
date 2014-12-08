/*

	Config Object for running procees like Gulp or CLI's

*/


var path         =  require("path")
var fs           =  require("fs")
var gutil        =  require('gulp-util');
var PluginError  =  gutil.PluginError;
var config       =  {};
var debug        =  false;

function setup(jsonPath, validateFunction){
	if( Object.keys(config).length > 0) error("Config already has keys, setup with Json would erase them. Run setup before setting up keys");
	
	try{
		config = require( localize(jsonPath).toString() );
		if( validateFunction ) validateFunction()
			return {
				localize: localize,
				raw: config,
				get: get,
				set: set,
				debug: debug
			}
	}catch(e){ console.log(e); error( jsonPath + " is not valid or is not be present in " + localize( jsonPath ) + ", check path."); }
}

function get(value, nullValue){
	function index(obj,i) { 
		if(!obj) return null;
		return obj[i]; 
	}

	if( config[value] && config[value] != "undefined" && config[value] != undefined ) return config[value]

	var resp = value.split('.').reduce(index, config)
	if( ( resp == null || resp == undefined || resp == "undefined" ) && nullValue != null ) return nullValue;
	if( ( resp == null || resp == undefined || resp == "undefined" ) && nullValue == null ) error( value + " was not found in clay.json")

	return resp;
}

function set(key, value){
	config[key] = value;
}

var localize = function( ){
  var args = Array.prototype.slice.call(arguments);
  args = args.reverse();
  args.push( process.cwd() )
  args = args.reverse();

  for (var i = args.length - 1; i >= 0; i--) {
  	args[i] = args[i].replace("./","")
  };

  return path.join.apply(this, args );
}


function error(err){
	if(debug) console.log( new Error().stack );

	throw new PluginError({
    plugin: 'r2-config',
    message: err
  });
}



module.exports =  {
	localize: localize,
	raw: config,
	get: get,
	set: set,
	setup: setup,
	debug: debug
};
