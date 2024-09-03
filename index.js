import Components from "./src/components";
import Includes from "./src/includes";

export const getInstance = function (namespace) {
  if (!globalThis._groundworkjs) {
    globalThis._groundworkjs = {};
  }

  if (globalThis._groundworkjs[namespace]) {
    return globalThis._groundworkjs[namespace];
  }
};

class Groundwork {
  constructor(namespace) {
    if (getInstance(namespace)) {
      return getInstance(namespace);
    }

    this.namespace = namespace;

    this.components = new Components(this.namespace);
    this.includes = new Includes();

    globalThis._groundworkjs[this.namespace] = this;
  }

  run() {
    this.components.run();
    this.includes.run();
  }
}

export default Groundwork;
