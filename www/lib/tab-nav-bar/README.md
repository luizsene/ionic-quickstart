
Ionic tabNavBar
=======================

What Is This?
-------------

The module consists of tabNavBar in a directive which aims to facilitate navigation menu creation for hybrid applications developed with IONIC FRAMEWORK.

To work correctly you must have installed in your environment:

1. Ionic Framework - http://ionicframework.com/

Install:
-----------------------

Install on your project folder

```
bower install tab-nav-bar
```




How to use:
-----------------------

To use you must first import into your project dependencies:

* Make loading the file in your file __index.html__ .

```
  <script src="lib/tabNavBar/dist/minify/tab_nav_bar.min.js"></script>
```

and

```
<link href="lib/tabNavBar/dist/minify/tab_nav_bar.min.css" rel="stylesheet">
```

* import to __app.js__ the following module:

```
com.tabNavBar.1fabiopereira
```


* Above the __ion-content__ should add the following line:

  Like element:
  ```
  <tab-nav-bar
      tabs="['nav1', 'nav2', 'nav3', 'nav4']"
      tab-activated="1"
      tab-activated-color="#f00"
      background-color="#ff0",
      background-block-color="#ccc"
      text-color="#fff">
  </tab-nav-bar>
  ```

  or

  Like a attribute:
  ```
  <div tab-nav-bar    
      tabs="['nav1', 'nav2', 'nav3', 'nav4']"
      tab-activated="1"
      tab-activated-color="#f00"
      background-color="#ff0",
      background-block-color="#ccc"
      text-color="#fff">
  </div>
  ```


* With the files already loaded and the setting made, create the blocks that will receive the content, it is necessary in each block add __tab-nav-block__ directive to inform that that element corresponds to a block that will be monitored.

  - Note: The blocks must be placed within the __ion-content__.

```
...
  <section tab-nav-block="1" limit='4'>
    <div>
      <h1>Bloco 1</h1>
    </div>
  </section>

  <section tab-nav-block="2" limit='4'>
    <div>
      <h1>Bloco 2</h1>
    </div>
  </section>

  <section tab-nav-block="3" limit='4'>
    <div>
      <h1>Bloco 3</h1>
    </div>
  </section>

  <section tab-nav-block="4" limit='4'>
    <div>
      <h1>Bloco 4</h1>
    </div>
  </section>
...
```




Config
--------------------------

1. To set the names of the tabs simply enter an array containing the names:
```
<tab-nav-bar
    tabs="['nav1', 'nav2', 'nav3', 'nav4']">
</tab-nav-bar>
```

2. To define which tab is active by default, _default: 0_:
```
<tab-nav-bar
    tab-activated="1">
</tab-nav-bar>
```

3.   Border color of the active tab, _default: #f00_.
```
 <tab-nav-bar
     tab-activated-color="#f00">
 </tab-nav-bar>
```

4.    Background color of the tab, _default: #ddd_.
```
<tab-nav-bar
    background-color="#ff0">
</tab-nav-bar>
```

5.    Background color of block, _default: #fff_.
```
<tab-nav-bar
    background-block-color="#ccc">
</tab-nav-bar>
```

6.   Text color of tabs, _default: #000_
```
<tab-nav-bar
    text-color="#fff">
</tab-nav-bar>
```

7. Difine blocks:

  ```
  <section tab-nav-block="1" limit='4'>
    <div>
      <h1>Bloco 1</h1>
    </div>
  </section>
  ```

  * each block gets your number, it will be the same in the corresponding tab, and that limit is the maximum number of blocks that contains view

  * __tab-nav-block__: number of block;
  * __limit__: number of blocks that contains view;

License
--------------------------
  The MIT License (MIT)

  Copyright (c) 2016 Fábio Pereira

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
  persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
  TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
