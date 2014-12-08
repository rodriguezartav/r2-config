process.chdir( "./test/fixtures" );

var fs      = require("fs");
var test    = require('tape');
var path    = require("path")
var config  = require("../")
config.debug = true;

test('should work with out JSON', function (t) {
  t.plan(1);
  
  t.equal( config.get("key1", true), true );
  
});


test('should start config and read values from json', function (t) {
  t.plan(2);

  //Reset to avoid error
  config.raw = {};
	config.setup("config.json");
  
  t.deepEqual( config.get("key1"), { 		"key1-1": ["a","b","c"] } );
  
  t.deepEqual( config.get("key1.key1-1"),  ["a","b","c"] );

});


test('should set values', function (t) {
  t.plan(2);
  
	config.set("KEY_4", true);

  t.equal( config.get("KEY_4"), true);
  
	config.set("key1.key1-1", true);

	t.equal( config.get("key1.key1-1"),  true );

});


test('should get default value', function (t) {
  t.plan(4);
  
	
  t.equal( config.get( "KEY_41", true), true );
  
	t.equal( config.get( "KEY_41", false), false );

  t.equal( config.get( "KEY_41", 21), 21 );

  t.deepEqual( config.get( "KEY_42", [] ), []);

});






