import domReady from '@wordpress/dom-ready';

export default class Components {
  library = {};
  elementInstances = {};

  constructor(namespace) {
    this.namespace = namespace;
  }

  getInitAttributeName() {
    if (this.namespace) {
      return `data-gw-${this.namespace}-init`;
    } else {
      return `data-gw-init`;
    }
  }

  getElementInstanceAttributeName() {
    if (this.namespace) {
      return `data-gw-${this.namespace}`;
    } else {
      return `data-gw`;
    }
  }

  add(key, fn, opts = {}) {
    this.library[key] = fn;

    if (opts.schedulerYield) {
      this.library[key].schedulerYield = opts.schedulerYield;
    }

    return this;
  }

  addInstance(el, elementIdentifier, componentKey, fn) {
    if (!el.getAttribute(this.getElementInstanceAttributeName())) {
      el.setAttribute(
        this.getElementInstanceAttributeName(),
        elementIdentifier
      );
    }

    if (!this.elementInstances[elementIdentifier]) {
      this.elementInstances[elementIdentifier] = {};
    }

    this.elementInstances[elementIdentifier][componentKey] = fn;

    return this;
  }

  getInstance(elementIdentifier, componentKey) {
    if (
      this.elementInstances[elementIdentifier] &&
      this.elementInstances[elementIdentifier][componentKey]
    ) {
      return this.elementInstances[elementIdentifier][componentKey];
    }

    return false;
  }

  getInstances(componentKey) {
    const instances = [];
    const elementInstanceKeys = Object.keys(this.elementInstances);

    if (elementInstanceKeys.length) {
      elementInstanceKeys.forEach((instanceKey) => {
        if (this.elementInstances[instanceKey][componentKey]) {
          instances.push(this.elementInstances[instanceKey][componentKey]);
        }
      });
    }

    return instances;
  }

  run() {
    domReady(() => {
      document
        .querySelectorAll(`[${this.getInitAttributeName()}]`)
        .forEach((el) => {
          // Get init definition
          let init;
          try {
            init = JSON.parse(el.getAttribute(this.getInitAttributeName()));
          } catch (e) {
            console.error(
              `Error parsing init attribute for element: ${el.getAttribute(
                this.getInitAttributeName()
              )}`
            );
            return;
          }

          const elementIdentifer = Math.random().toString(36).substr(2, 12);

          // Iterate over keys of the object, each key is a component to initialise on the element
          Object.keys(init).forEach((initKey) => {
            // Don't initialise twice
            if (el.getAttribute(this.getElementInstanceAttributeName())) {
              return;
            }

            if (!this.library[initKey]) {
              console.error(`No component "${initKey}" found`);
              return;
            }

            if (typeof this.library[initKey] !== 'function') {
              console.error(
                `Component "${initKey}" found but was not a function: type is "${typeof this
                  .library[initKey]}"`
              );
              return;
            }

            function callComponent() {
              // Call component on element, saving instance to data for the element if it returns something
              const componentInstance = this.library[initKey].call(
                this,
                el, // Element initialising on
                init[initKey] // Args
              );

              if (componentInstance) {
                this.addInstance(
                  el,
                  elementIdentifer,
                  initKey,
                  componentInstance
                );
              }
            }

            if (this.library[initKey].schedulerYield) {
              (async () => {
                if ('scheduler' in window && 'yield' in window.scheduler) {
                  await window.scheduler.yield();
                  callComponent();
                } else {
                  await new Promise((resolve) => setTimeout(resolve, 0));
                  callComponent();
                }
              })();
            } else {
              callComponent();
            }
          });

          el.removeAttribute(this.getInitAttributeName());
        });
    });
  }
}
