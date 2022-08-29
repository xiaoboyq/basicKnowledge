let args = [11,22,'33','44']
let aaa = '123'
function fn() {
  let total = 0;
  for(let i = 0, l =arguments.length; i<l; i++ ) {
    total += arguments[i]
  }
  console.log(total)
}

eval('fn('+['aaa',22,'33','44']+')')