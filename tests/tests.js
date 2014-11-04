"use strict";

var s = 'https://farm9.staticflickr.com/8332/8120689640_87dc7783fd_q.jpg'
  , t = 'https://farm9.staticflickr.com/8332/8120689640_87dc7783fd_z.jpg'
  , el = '<div id="injected" class="zoomz"><img src="'+s+'" data-zoomz="'+t+'" /></div>'
  , QUnit = QUnit || {}
  , $source, $target, $zoomz
  ;

module('desktop', {
  setup: function () {
    $('body').append(el);
    $source = $('[data-zoomz]').zoomz();
    $zoomz  = $source.closest('.zoomz');
    $target = $('#injected').find('.target');
  },
  teardown: function () {
    $zoomz.remove();
  }
});
QUnit.test('target injected into DOM', function () {
  QUnit.equal($target.length, 1, '$target.length is 1');
});
QUnit.test('target src correct', function () {
  QUnit.equal($target.attr('src'), $source.data('zoomz'), 
    '$target src is $source data zoomz attribute');
});
QUnit.test('mouseover source reveals target', function () {
  var o; 
  $zoomz.addClass('hover');
  o = $target.css('opacity');
  QUnit.equal(o, 1, "opacity of $target is 1 when hover applied to $zoomz");
});

// QUnit.test('mouseover source reveals target', function () {
//   var o
//     , e = $.Event('mousemove')
//     ;
//   e.pageX = 100;
//   e.pageY = 300;
//   setTimeout(function(){
//     $zoomz.trigger(e);
//     setTimeout(function(){
//       // console.log($target.css('top')); // BEN: qunit is messing with the offset values
//       QUnit.equal($target.css('opacity'), 1, "mouseover source reveals target");
//       QUnit.start();
//     }, 1000);
//   }, 1000);
//   QUnit.stop();
// });

// Test for incorrect data-zoomz value
// Test for coordinates @see qunitjs.com:Testing User Actions
// x:100,width{source:150,zoomz:300,target:900} = l:300?
// x:100,width{source:150,zoomz:150,target:300} = l:100?


