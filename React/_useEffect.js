// useEffect(() => {
//   effect
//   return () => {
//     cleanup
//   }
// }, [input])

// 利用二维数组来记录 depArray 【useEffect的第二个参数，即依赖】
const allDep = [0][0];
let effectCursor = 0

function _useEffect(cb, depArray) {
  if(!depArray){
    cb();
    allDep[effectCursor] = depArray;
    effectCursor++;
    return;
  }

  // deps代表的是上一次页面的同一个useeffect的依赖项
  // depArray是本次的useEffect的依赖项的值
  const deps = allDep[effectCursor];

  // 这里只是简单模拟实现 真实的复杂多了
  const hasChanged = deps? 
  depArray.some((item, index) => item !== deps[index] )  : true

  if(hasChanged) {
    cb()
    allDep[effectCursor] = depArray
  }

  effectCursor++
}