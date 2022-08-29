let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]
// function getNewDatafromArr(arr) {
//   let res = [];
//   let arrMap = {};

//   for (const item of arr) {
//     arrMap[item.id] = {...item, children: []}
//   }

//   for (const item of arr) {
//     const id = item.id
//     const pid = item.pid
//     const treeItem = arrMap[id]
//     if(item.pid === 0) {
//       res.push(treeItem)
//     } else {
//       if(!arrMap[pid]) {
//         arrMap[pid] = {children: []}
//       }
//       arrMap[pid].children.push(treeItem)
//     }
    
//   }
// console.log(res)
//   return res
// }

function getNewDatafromArr(arr) {
  let newArr = [];

  let stack = []

  for (let j = 0; j < arr.length; j++) {
    if(arr[j].pid === 0) {
      stack.push(arr[j])
      newArr.push(arr[j])
    }
   }

  while(stack.length) {
    let current  = stack.pop();
    current.children = [];
    for (let j = 0; j < arr.length; j++) {
     if(arr[j].pid === current.id) {
       current.children = [...current.children, arr[j]]
       stack.push(arr[j])
     }
    }
   
  }
  console.log(JSON.stringify(newArr))

}



getNewDatafromArr(arr)


// [
//   {
//       "id": 1,
//       "name": "部门1",
//       "pid": 0,
//       "children": [
//           {
//               "id": 2,
//               "name": "部门2",
//               "pid": 1,
//               "children": []
//           },
//           {
//               "id": 3,
//               "name": "部门3",
//               "pid": 1,
//               "children": [
//                   // 结果 ,,,
//               ]
//           }
//       ]
//   }
// ]

