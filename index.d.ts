export type ComponentFunction<args extends Object> = (elem: Element, args: args) => void;

declare class Components {
    getInitAttributeName(): string;
    getElementInstanceAttributeName(): string;
    add(key: string, fn: Function): ThisType;
    addInstance(el: Element, elementIdentifier: string, componentKey: string, fn: Function): ThisType;
    getInstance(elementIdentifier: string, componentKey: string): ThisType;
    getInstances(componentKey): [Element];
    run(): void;
}

declare class Includes {
    add(key: string, fn: Function): ThisType;
    run(): ThisType;
}

declare class Groundwork {
    constructor (namespace: string): ThisType;
    run(): void;

    components: Components;
    includes: Includes;
}

export default Groundwork;