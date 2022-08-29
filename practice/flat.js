// 如果你不知道数组要降维的层数，你可以直接将参数设置为infinity（无限大），这样不管你是几维都会被降为一维数组：

let arr = [[[[[1,2]]]]];
let arr_ = arr.flat(Infinity);
console.log(arr_);//[1, 2]
// 简单粗暴，好用是好用，兼容也是个大问题，谷歌版本从69才完全支持，其它浏览器自然没得说。



/***
 * 简单模拟flat实现1.
 * ***/
//  巧妙使用apply参数接受数组的特点，让push也能扁平化接受一个一维数组，从而达到数组合并的目的
let arr = [0, [1],
    [2, 3],
    [4, [5, 6, 7]]
];

function flat_(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('The argument must be an array.');
    };
    let arr_ = [];
    arr.forEach((self) => {
        Array.isArray(self) ?
            arr_.push.apply(arr_, flat_(self)) :
            arr_.push(self);
    });
    return arr_;
};
flat_(arr); //[0, 1, 2, 3, 4, 5, 6, 7]

/***
 * 简单模拟flat实现2.
 * ***/

 function flat2_(arr) {
  if (!Array.isArray(arr)) {
      throw new Error('The argument must be an array.');
  };
  return arr.reduce((accumulator, currentValue) => {
      return accumulator.concat(Array.isArray(currentValue) ? flat2_(currentValue) : currentValue);
  }, []);
};
console.log(flat2_(arr));//[0, 1, 2, 3, 4, 5, 6, 7]


// axios的源码是怎么实现的？
// 答浏览器端使用XmlHttpRequest函数和Promise实现的，nodejs端用的http和https库实现的。