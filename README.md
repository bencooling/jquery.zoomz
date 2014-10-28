# jquery.zoomz

jQuery plugin to magnify or zoom in on image(s)

TODO
Add gulp task for minimising css + js, browsersync for test-runner.html
unit test in browser than look at automation
look at debounce?
cross browser
Add gulp file to compress

**lighweight** 
- js: only x.xk compressed
- css: optional and only x.xk compressed

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

**css**

    <link rel="stylesheet" href="jquery.zoomz.css" />

**Javascript**

    $('[data-zoomz]').zoomz();

**Markup: Zoom over regular image**

    <div class="zoomz">
      <img data-zoomz="path/to/target.jpg" src="path/to/source.jpg">
    </div>

**Markup: Zoom outside regular image (Behaves as thumbnail)**

    <img data-zoomz="id-of-target" src="path/to/source.jpg">
    ...
    <div class="zoomz">
      <img class="target" id="id-of-target" src="path/to/target.jpg">
    </div>


## Testing

    node_modules/.bin/qunit -t tests/tests -c src/HelloWorld -d node_modules/jquery/dist/jquery assets/repo/jquery.zoomz/src/jquery.zoomz

