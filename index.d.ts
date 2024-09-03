export type ComponentFunction<
  TElem extends HTMLElement,
  TArgs extends Object
> = (elem: TElem, args: TArgs) => void;

declare class Components {
  getInitAttributeName(): string;
  getElementInstanceAttributeName(): string;
  add(key: string, fn: Function): this;
  addInstance(
    el: HTMLElement,
    elementIdentifier: string,
    componentKey: string,
    fn: Function
  ): this;
  getInstance(elementIdentifier: string, componentKey: string): this;
  getInstances(componentKey): [HTMLElement];
  run(): void;
}

declare class Includes {
  add(key: string, fn: Function): this;
  run(): this;
}

declare class Groundwork {
  constructor(namespace: string);
  run(): void;

  components: Components;
  includes: Includes;
}

export default Groundwork;
