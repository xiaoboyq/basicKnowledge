

function setState(pendingStates, state) {
  pendingStates.forEach(nextState => {
    // let isReplace = _.isArr(nextState)  // 判断是否为数组， 是数组 则直接替换原来的state
    // if (isReplace) { //  如果是数组 获取数组的第一项赋值给nextState
    //   nextState = nextState[0]
    // }
    console.log(nextState)
    if (typeof nextState === 'function') {  // 如果是函数， 先执行函数 得到最新值赋值给nextState
      nextState = nextState.call(null, state)
    }
    

    // replace state
    // if (isReplace) { 
    //   state = {...nextState}  // 数组直接替换
    // } else {
      state = {...state, ...nextState} // 不是数组， 则合并老的state和更新的state
    // }
    console.log(state)
    return state
  })
  
}

let state = {
  num: 0,
  self: 'xx'
}

// 参数为函数的调用 
// setState(
//   [
//     prestate => {
//       return { num: prestate.num + 1}
//     },
//     prestate => {
//       return {num: prestate.num + 3}
//     },
//   ],
//    state)

//传入参数是对象的调用 会合并所有的setstate 
setState([{num: state.num + 1},{self: state.self + 1},{num: state.num + 1}], state)

// 相当于
// Object.assign(
//   state,
//   {num: state.num + 1},
//   {num: state.num + 1},
//   ...
// )


