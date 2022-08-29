var data = [
  {userId: 8, title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];

var find = function(origin) {
 const res = [] 
 origin&&origin.length&&origin.forEach(item =>{
   let str = /\d$/ 
   if(!str.test(item.title)) return
    res.push(item)
  }) || []

  res.sort(sortArrayByUserId)
  console.log(res)
  
}

function sortArrayByUserId(a,b) {
 return   b.userId - a.userId
}

find(data)