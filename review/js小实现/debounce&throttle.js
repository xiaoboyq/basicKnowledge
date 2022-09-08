function test() {

}

test = debounce(test, 3000);

function debounce(fn, delay = 500) {
  let timer;
  return function() {
    if(timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(()=> {
      fn.apply(this, [...arguments])
    }, delay)
  }
}

function throttle(fn, delay) {
  let timer, flag = true;
  return function() {
    if(!flag) {
      return 
    }
    flag = false
    timer = setTimeout(()=> {
      fn.apply(this, [...arguments])
      clearTimeout(timer)
      flag = true
    }, delay)
  }
}


