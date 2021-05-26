export default class Includes {
  library = {};

  add(key, fn) {
    this.library[key] = fn;
    return this;
  }

  run() {
    Object.values(this.library).map(
      (include) => typeof include === "function" && include.call()
    );
    return this;
  }
}
