"use strict";

console.log($);

var small = 150
  , large = 1450
  ;
function conv(n){
  return Math.round( (n/small)*large );
}

QUnit.test( "convert test", function( assert ) {
  assert.ok( conv(90) === 870, "Passed!" );
});