
// 特别棒  https://blog.csdn.net/qq_40282016/article/details/117088083

//  const [state, setstate] = useState(initialState)
// 模拟实现useState

let stateArray = []; // 利用数组来存储state
let cursor = 0;    // 游标： 标记当前的位置

function _useState(initialState) {
  const currentSursor = cursor;
  stateArray[currentSursor] = stateArray[currentSursor] || initialState

  function setState(newState) {
    stateArray[currentSursor] = newState;
    render(); // 当state改变调用render函数重新渲染页面
  }

  cursor++;

  return [stateArray[currentSursor], setState]; // 返回当前state和当前方法
}
