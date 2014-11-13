'use strict';

// support stand alone jquery plugin, requirejs or npm module 
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

// jQuery plugin 
}(function(jQuery) {

  // constructor function  
  function init($source, settings){

    var target  = $source.data('zoomz')
      , left    = $source.offset().left
      , top     = $source.offset().top
      , isTouch = (('ontouchstart' in window) || typeof window.DocumentTouch !=='undefined' && document instanceof DocumentTouch)
      , $target
      , $zoomz // container div that is smaller than large (target) image
      , $mouseable
      , sourceWidth
      , sourceHeight
      , targetWidth
      , targetHeight
      , zoomzWidth
      , zoomzHeightDiff
      , zoomzWidthDiff
      , zoomzHeight
      , mouseableLeft
      , mouseableTop
      ;

    // target is image src
    if (target.indexOf('#')===-1){
      $target = $('<img class="target" />')
        .load(function(){
          attachEvents();
        })
        .attr('src', target)
        .insertBefore($source)
        ;
    }
    // target is image id
    else if ( $(target).length ) {
      $target = $(target);
      $mouseable = $source; // becomes $zoomz if $source inside of $zoomz
      attachEvents();
      console.log('a', $source);
      $source.addClass('source-init');
      $zoomz.addClass('zoomz-init');
    }

    function attachEvents(){
      $zoomz          = $target.closest('.zoomz');
      sourceWidth     = $source.width();
      sourceHeight    = $source.height();
      targetWidth     = $target.width();
      targetHeight    = $target.height();
      zoomzWidth      = $zoomz.width();
      zoomzHeight     = $zoomz.height();
      zoomzHeightDiff = targetHeight - zoomzHeight;
      zoomzWidthDiff  = targetWidth - zoomzWidth;
      $mouseable      = (typeof $mouseable==='undefined') ? $zoomz : $mouseable;
      // TODO: cachable option
      // mouseableLeft   = $mouseable.offset().left;
      // mouseableTop    = $mouseable.offset().top;

      console.log('b', $zoomz);
      $mouseable
        .not('.zoomz-ready') // Only attach events once
        .addClass('zoomz-ready');

      if ((!isTouch) && settings.mousemove){
        $mouseable
          .on('mousemove', onmousemove)
          .on('mouseleave', zoomEnd);
      }
      else if (isTouch && settings.touchmove){
        $mouseable
          .on('touchmove', ontouchmove)
          .on('touchend', zoomEnd);
      }
      console.log('c', $zoomz);
      function onmousemove(e){
        var x  = e.pageX - $mouseable.offset().left
          , y  = e.pageY - $mouseable.offset().top
          ;
        $zoomz.addClass('hover');
        console.log('sourceWidth', sourceWidth);
        console.log('zoomzWidthDiff', zoomzWidthDiff);
        $target.css({
          'left' : '-' + convert(x, sourceWidth, zoomzWidthDiff) + 'px'
        , 'top'  : '-' + convert(y, sourceHeight, zoomzHeightDiff) + 'px'
        });
      }
      function ontouchmove(e){
        var eventTouches = e.originalEvent.touches[0]
          , x  = eventTouches.pageX - $mouseable.offset().left
          , y  = eventTouches.pageY - $mouseable.offset().top
          ;
          // ios can touchmove off element
          x = (x<0) ? 0 : (x>sourceWidth) ? sourceWidth : x;
          y  = (y<0) ? 0 : (y>sourceHeight) ? sourceHeight : y;

          e.preventDefault();
          $zoomz.addClass('hover');
          $target.css({
            'left' : '-' + convert(x, sourceWidth, zoomzWidthDiff) + 'px'
          , 'top'  : '-' + convert(y, sourceHeight, zoomzHeightDiff) + 'px'
          });
      }
      function zoomEnd(){
        $zoomz.removeClass('hover');
      }
    }

    // determine target coordinates relative to source
    function convert(n, source, zoomzDiff){
      return Math.round( (n/source)*zoomzDiff );
    }

  }

  // jQuery plugin
  jQuery.fn.zoomz = function(options){
    var defaults = {
          touchmove : true
        , mousemove : true
        }
      , settings = $.extend(options, defaults);
    $(this).each(function(){
      var $el = $(this)
        , api   = new init($el, settings)
        ;
      $el.data('api', api);
      console.log('$el', $el);
    });
    return this;
  };

}));