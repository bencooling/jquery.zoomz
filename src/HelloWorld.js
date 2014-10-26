"use strict";

// percentage 
// 
// 150 (/5=30), 1600(1450) (/5=290)
// 150:90, 1600:870
// 
// convert(90, 150, 1600);
// 
var small = 150
  , large = 1450
  ;

return function(n){
  var percentage = parseInt(parseInt(small)/n);
  return parseInt(large)/100*percentage;
};

/**
 * 
 * 
 * @param  {Object} source { width: {integer}, height: {integer} }
 * @param  {Object} target { width: {integer}, height: {integer} }
 * @return {null}
 */
// function setup(source, target){
//   convert(90);
// }