
class asyncHook {
  constructor() {
    this.taps = [];
  }

  call = () => {
    this.taps.forEach(v => v.fn())
  }

  tap = (options, fn) => {
    const tapInfo = {...options, fn}
    this.taps.push(tapInfo);
    }
}
class complier{
  constructor() {
    this.done = new asyncHook()
  }

  run () {
    
  }
  // xxx
}
// Plugin.apply(complier)


class xxxPlugin{
  constructor(options) {
    this.options = options;
  }

  apply(complier) {
    complier.hooks.done.tap('xxx', (_, cb) => {

    })
  }
}
