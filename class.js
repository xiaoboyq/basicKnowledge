class Test {
  constructor() {

  }

  fn() {
    console.log(this)
  }

  arrowFn = () => {

  }
}


console.log('Test prototye', Test.prototype)
console.log('new Test', new Test())