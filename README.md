# jquery.zoomz

[![Build Status](https://travis-ci.org/bencooling/jquery.zoomz.svg?branch=master)](https://travis-ci.org/bencooling/jquery.zoomz)

jQuery plugin to magnify or zoom in on an image(s).

**features**

- Supports both mobile touch & desktop mouse events.
- Supports requirejs, npm or as a stand alone jQuery plugin.

**lighweight**

- js: Only 1kb compressed
- css: optional & only <1kb compressed

**flexible**

- zoom over
- zoom outside image (thumbnail)

**compatabile**

- ie8 and up
- modern browsers

**modular**

- install via bower dependency manager
- distributed with source scss & js files

## Markup

- Wrap an image with `div.zoomz`
- Apply a `data-zoomz` attribute to the image with a value of either:

  1. the src of a larger version of the image (zoom over)
  2. id of a `.target` image (zoom outside, act as thumbnail)

## Example

**CSS**

    <link rel="stylesheet" href="jquery.zoomz.css" />

**Javascript**

    <script src="src/jquery.zoomz.js"></script>
    <script>
      (function($){
        $(window).load(function(){
          $('[data-zoomz]').zoomz();
        });
      })(jQuery);
    </script>

**Markup: Zoom over regular image**

    <div class="zoomz">
      <img data-zoomz="path/to/target.jpg" src="path/to/source.jpg">
    </div>

**Markup: Zoom outside regular image (Behaves as thumbnail)**

    <img data-zoomz="target-id" src="path/to/source.jpg">
    ...
    <div class="zoomz">
      <img class="target" id="target-id" src="path/to/target.jpg">
    </div>

## Testing

**Command line**

    gulp qunit

**Browser**

    gulp serve:qunit

## TODO

1. Add additional unit tests
1. Cross browser testing
1. Add configuration object for target and caching
1. Add option for zooming in