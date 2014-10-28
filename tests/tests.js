"use strict";

var s = 'https://farm9.staticflickr.com/8332/8120689640_87dc7783fd_q.jpg'
  , t = 'https://farm9.staticflickr.com/8332/8120689640_87dc7783fd_z.jpg'
  , el = '<div id="injected" class="zoomz"><img src="'+s+'" data-zoomz="'+t+'" /></div>'
  , QUnit = QUnit || {}
  , $source, $target, $zoomz
  ;

module('data-zoomz is src', {
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

QUnit.test('source has target', function () {
  QUnit.equal($target.length, 1, 'source has target');
});
QUnit.test('target src is data zoomz property', function () {
  QUnit.equal($target.attr('src'), $source.data('zoomz'), 
    'Injected image element src is zoomz data attribute');
});
QUnit.test('mouseover source reveals target', function () {
  var o; 
  $zoomz.addClass('hover');
  o = $target.css('opacity');
  QUnit.equal(o, 1, "mouseover source reveals target");
});

// x:100,width{source:150,zoomz:300,target:900} = l:300?
// x:100,width{source:150,zoomz:150,target:300} = l:100?