import React, { Component } from 'react'

class Child extends Component {
  constructor() {
    super()
    // this.state = {
    //   child: 4444,
    // }
    // this.handleFN.bind(this)
    // this.class
  }
  state = {
    stateOut: '1231',
  }


    handleClick = () => { // 箭头函数会定义在实例对象上
      console.log('123')
    }

    handleFN() { // 会被定义到原型对象上
      // console.log(this.state.stateOut)
      console.log('fn')
    }

  render() {
    return (
      <div onClick={this.handleFN}>{this.state.child} </div>
    )
  }
}


export default class index extends Component {
  constructor() {
    super()
    this.state = {
      value: 123,
    }
  }


  render() {
  console.log(Child.toString())
  console.log('Child.prototype', Child.prototype)
  console.log(new Child())

    return (
      <div>{this.state.value}
      <Child/></div>
    )
  }
}
