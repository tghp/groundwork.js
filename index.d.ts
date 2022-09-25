export type ComponentFunction<args extends Object> = (elem: Element, args: args) => void;

declare class Components {
    getInitAttributeName(): string;
    getElementInstanceAttributeName(): string;
    add(key: string, fn: Function): this;
    addInstance(el: HTMLElement, elementIdentifier: string, componentKey: string, fn: Function): this;
    getInstance(elementIdentifier: string, componentKey: string): this;
    getInstances(componentKey): [Element];
    run(): void;
}

declare class Includes {
    add(key: string, fn: Function): this;
    run(): this;
}

declare class Groundwork {
    constructor (namespace: string);
    run(): void;

    components: Components;
    includes: Includes;
}

export default Groundwork;