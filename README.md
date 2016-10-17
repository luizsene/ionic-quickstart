## Ionic Quickstart [![Build Status](https://travis-ci.org/1fabiopereira/ionic-quickstart.svg?branch=master)](https://travis-ci.org/1fabiopereira/ionic-quickstart) 

### What is this ? :pushpin:
--------------------------------

Quickstart is a template that has boilerplate code that ionic developers have to write when starting a project using the ionic 1.X and provide an organizational base code and distributed according to their responsibilities. The coding style used is described by [@johnpapa](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

### How to use: :pushpin:
--------------------------------
 Run:
```
git clone https://github.com/1fabiopereira/ionic-quickstart.git
```
```
$ cd your/path/project
$ npm install
$ ionic serve
```

### Unit test: :pushpin:
--------------------------------

*   Requirements:

  [<img src="http://jasmine.github.io/images/jasmine_vertical.svg" width="48">](http://jasmine.github.io/)

  [<img src="https://karma-runner.github.io/assets/img/banner.png" width="80">](https://karma-runner.github.io/1.0/index.html)

  [<img src="http://phantomjs.org/img/phantomjs-logo.png" width="80">](http://phantomjs.org/)


Run:
```
  gulp test
```
### Coverage: :pushpin:
--------------------------------
*  Requirements:

  [istanbul](http://gotwarlost.github.io/istanbul/)

  When the unit test runs will create a file __/tests/coverage/report/index.html__, this file will contain code coverage reports of the tests.

### Code style:
--------------------------------
*  Requirements:

  * [Eslint](http://eslint.org/docs/user-guide/configuring)

  * [eslint-plugin-angular](https://github.com/Gillespie59/eslint-plugin-angular)

   Run:

  ```
  eslint path/*.js
  ```

### Docs: :pushpin:
--------------------------------
*  Requirements:

  * [gulp-ngdocs](https://github.com/nikhilmodak/gulp-ngdocs)

   Run:
  ```
  gulp ngdocs
  ```

  * The generated documentation will be inside __/docs__

### License: :notebook_with_decorative_cover:
--------------------------------

The MIT License (MIT)

Copyright (c) 2016 Fábio Pereira

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
