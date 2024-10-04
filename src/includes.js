export default class Includes {
  library = {};

  add(key, fn, opts = {}) {
    this.library[key] = fn;

    if (opts.schedulerYield) {
      this.library[key].schedulerYield = opts.schedulerYield;
    }

    return this;
  }

  run() {
    Object.values(this.library).map((include) => {
      if (typeof include !== 'function') {
        return;
      }

      if (include.schedulerYield) {
        (async () => {
          if ('scheduler' in window && 'yield' in window.scheduler) {
            await window.scheduler.yield();
            include();
          } else {
            await new Promise((resolve) => setTimeout(resolve, 0));
            include();
          }
        })();
      } else {
        include();
      }
    });

    return this;
  }
}
