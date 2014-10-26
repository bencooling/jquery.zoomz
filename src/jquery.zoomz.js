(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
 
}(function(jQuery) {
  'use strict';

  // constructor function  
  function init($source){

    var target  = $source.data('zoomz')
      , left    = $source.offset().left
      , top     = $source.offset().top
      , $target
      , $zoomz // container div that is smaller than large (target) image 
      , $mouseable
      , widthViewport
      , heightViewport
      , widthTarget
      , heightTarget
      , diffWidth
      , diffHeight
      ;

    // target is either image src or DOM element id
    if (target.search(/(jpg|jpeg|png|gif)$/)!==-1){
      $target = $('<img class="target" />')
        .load(attachEvents)
        .attr('src', target)
        .insertBefore($source)
        ;
    }
    else if ( $('#'+target).length ) {
      $target = $('#'+target);
      $mouseable = $source; // becomes $zoomz if $source inside of $zoomz
      attachEvents();
    }
    else {
      throw Error('Incompatible zoomz data attribute');
    }

    function attachEvents(){
      $zoomz         = $target.closest('.zoomz');
      $mouseable     = (typeof $mouseable==='undefined') ? $zoomz : $mouseable;
      widthViewport  = $source.width();
      heightViewport = $source.height();
      widthTarget    = $target.width() - widthViewport;
      heightTarget   = $target.height() - heightViewport;
      left           = $zoomz.offset().left;
      top            = $zoomz.offset().top;
      diffWidth      = $zoomz.width() - $source.width();
      diffHeight     = $zoomz.height() - $source.height();

      $mouseable
        .not('.zoomz-ready') // Only attach events once
        .addClass('zoomz-ready')
        .on('mousemove', onmousemove)
        .on('mouseleave', onmouseleave);
    }

    function convert(n, small, large, diff){
      return Math.round( (n/small)*large-(diff) );
    }

    function onmouseleave(e){
      $zoomz.removeClass('hover');
    }

    function onmousemove(e){
      var $this = $(this)
          , x  = e.pageX - $this.offset().left
          , y  = e.pageY - $this.offset().top
          ;
        $zoomz.addClass('hover');
        $target.css({
          'left' : '-' + convert(x, widthViewport, widthTarget, diffWidth) + 'px'
        , 'top'  : '-' + convert(y, heightViewport, heightTarget, diffHeight) + 'px'
        });
    }
  }

  // console.log('$ ', $);
  // console.log('jquery', jquery);
  console.log('jQuery', jQuery);
  jQuery.fn.zoomz = function(){
    $(this).each(function(){
      var $el = $(this)
        , api   = new init($el)
        ;
      $el.data('api', api);
    });
  };

  return this;

}));