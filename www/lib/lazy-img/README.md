# lazy-img

## What is it ?
AngularJS directive that adds load in loading images.

## Install
```
bower install lazy-img
```

## How to use

add in index.html

```html
<script src="path/to/install/lazy-img/lazy.js"></script>
```

add module to dependency

```javascript
angular.module('starter', ['ionic', 'com.1fabiopereira.lazy'])
```
configure the default images

```javascript
.config(function(lazyImgConfigProvider){
  lazyImgConfigProvider.setLoadGif('load.gif'); //load gif
  lazyImgConfigProvider.setErrorGif('error.gif'); //error gif
  lazyImgConfigProvider.setDefaulHeight(300); // size of box in pixels if not be <img> - Optional
}
```
add directive in html

```html
<div class="row">
  <div class="col">
    <img width="100%" lazy-img="https://d13yacurqjgara.cloudfront.net/users/634508/screenshots/3014903/jessewalk_dribbble2.gif">
  </div>
</div>
```

or

```html
<div class="row">
  <div class="col">
    <div lazy-img="https://d13yacurqjgara.cloudfront.net/users/634508/screenshots/3014903/jessewalk_dribbble2.gif"></div>
  </div>
</div>
```
## License

The MIT License (MIT)

Copyright (c) 2016 Fábio Pereira

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
