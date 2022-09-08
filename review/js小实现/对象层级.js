function getObjLevel(obj) {
  let res = 0
  function computedLevel(obj, level = 0) {
    if(typeof obj === 'object' && obj !== null) {
      for(let key in obj) {
        if(typeof obj[key] === 'object' && obj[key] !== null) {
          computedLevel(obj[key], level + 1)
        } else {
          res = level + 1 > res ? level + 1: res  
        }
      
      } 
    } else {
      res = level + 1 > res ? level + 1: res  
    }
  }

  computedLevel(obj)


  return res;
}

const obj = {
  a: 123,
  b: {
    cc: {
      cccc: 123123,

    },
    bbb: 123,
  },
  c: {
    cc: 123,
    cc1: {
      ccc: {
        cccc: 123123
      }
    }
  }
}
console.log(getObjLevel(obj))