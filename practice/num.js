var str = '这是一条正则表达式转化前的的先前字符串3d要转化的4c'

var newStr = str.replace(/([0-9])([a-z])/g,"$1") // 正则前面的括号表示$; ([0-9])表示$1, ([a-z])表示 $2

console.log(newStr);


function thousandSeparator(num) {
  return (
    num &&
    (num.toString().indexOf('.') !== -1
      ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, ($1, $2) => {
          return `${$2},`;
        })
      :
       num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function($1, $2, $3, $4, $5) {
          // console.log(arguments)
          return `${$2},`;  // $1表示匹配的整体  $2 表示匹配的第一个子表达式 $3 表示p匹配的第2个子表达式
      // $4 表示匹配的位置; $5表示整体string  num
        }))
        // num.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,'))
  );
}


console.log(thousandSeparator(1234567890.91123123))