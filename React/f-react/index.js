
const isArr = Array.isArray
const toArray = arr => isArr(arr ?? []) ? arr : [arr]
// props.childern  可能是一个对象 { type: xxx, props: xxx} 
// 也可能是多个对象的数组 [{ type: xxx, props: xxx}, { type: xxx, props: xxx}]
// 用 toArray 统一为数组
function createElement(type, props, ...kids) {
  props  = props ?? {}
}


// Fragment的核心代码
export function Fragment(props) {
  return props.children
}