# groundwork.js

A no-nonsense approach to managing and initiating JS.

Groundwork provides a convenient way to:

1. Organise code run on every page
1. Run code against DOM elements in a component-like way

## Usage

```js
import Groundwork from "@tghp/groundwork.js";
const groundworkMain = new Groundwork("main");

// Add includes
groundworkMain.includes.add("header", require("./main/includes/globals"));

// Add components
groundworkMain.components.add("video", require("./main/components/video"));

// Initialise
groundworkMain.run();
```

or 

```js
import Groundwork from "@tghp/groundwork.js";
import globalInclude from './main/includes/globals';
import videoComponent from './main/components/video';
const groundworkMain = new Groundwork("main");

// Add includes
groundworkMain.includes.add("header", globalInclude);

// Add components
groundworkMain.components.add("video", videoComponent);

// Initialise
groundworkMain.run();
```

Refer to concepts below to understand this usage.

## Concepts

### The `Groundwork` class

Create an instance of groundwork passing a string. This is akin to a namespace. This namespace is used for any data attributes.

### Includes

Includes are run every time, as soon as groundwork is run. Each include should return a method, this method is called with no arguments.

### Components

Inspired by [Magento 2's `data-mage-init`](https://developer.adobe.com/commerce/frontend-core/javascript/init/#declarative-notation), components execute as a result of `` `data-gw-${namespace}-init` `` attributes. Pass this attribute JSON where the root key is the name of the component and the value is another object providing arguments to the component (if needed).

For example:

```html
<!-- In this example, no args are passed to the component  -->
<div data-gw-main-init='{"video": {}}'></div>

<!-- In this example, we pass some args to the component -->
<div data-gw-main-init='{"video": { id: 123456, autoplay: false }}'></div>
```

Components should export a method, this is what is called with the DOM node as the first argument and the args as the second:

```js
module.exports = (elem, args) => {
  // Component logic here
};
```

### Component Instances

If the component function returns something (for example, an object providing an API) groundwork will add an `` `data-gw-${namespace}` `` attribute to the DOM element, providing an instance reference that can used with `getInstance` to get the instance of that component.

Component functions are called using `Function.prototype.call()` assigning `this` to the groundwork class, so `getInstance` is then available to you.
