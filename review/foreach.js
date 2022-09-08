
let arr = new Array(100000).fill(0)
let cur = performance.now()
arr.forEach((v, i)=> arr[i] = v + 1)
console.log('forEach_end', performance.now() - cur)

let curMap = performance.now()
let kk = arr.map((v, i) => v + 1)
console.log('map_end', performance.now() - curMap)


// 10000
// forEach_end 0.6000000238418579
// VM45:8 map_end 0.40000003576278687


// 100000
// forEach_end 3.099999964237213
// VM71:8 map_end 2.399999976158142

////////////////////////////////////////百万的时候出现不一样了 map开始慢了//////////////////

// 1000000 百万
// forEach_end 14.900000035762787
// VM49:9 map_end 16.400000035762787

// 10000000 千万
// forEach_end 112.10000002384186
// VM53:9 map_end 147.5


//100000000 亿
// forEach_end 1088.300000011921
// VM57:8 map_end 1880.699999988079


// let arr1 = new Array(1000000).fill(0)

// let cur1 = performance.now()
// let res = []
// arr1.forEach((v, i)=> res.push(v + 1))
// console.log('forEach_end', performance.now() - cur1)

// let curMap1 = performance.now()
// let kk1 = arr1.map((v, i) => v + 1)
// console.log('map_end', performance.now() - curMap1)


