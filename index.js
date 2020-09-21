import Components from './src/components';
import Includes from './src/includes';

export const getInstance = function (namespace) {
    if (!global._groundworkjs) {
        global._groundworkjs = {};
    }

    if (global._groundworkjs[namespace]) {
        return global._groundworkjs[namespace];
    }
}

class Groundwork {

    constructor (namespace) {
        if (getInstance(namespace)) {
            return getInstance(namespace);
        }

        this.namespace = namespace;

        this.components = new Components(this.namespace);
        this.includes = new Includes();

        global._groundworkjs[this.namespace] = this;
    }

    run () {
        this.components.run();
        this.includes.run();
    }

}

export default Groundwork;
