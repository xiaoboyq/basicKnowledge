

var data = [
  {userId: 8, title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];

var find = function(origin) {
  function orderBy(id, sort) {
   return  origin.sort((a,b) => {
     if(sort === 'desc') {
     return  b[id] - a[id]  
     } 
    return a[id] - b[id]
    
    });
  }
  function where(args) {
    origin = origin.filter(item=> args.title.test(item.title))
    return { 
      orderBy
    }
  }
  
  return  {
    where,
    
  }
}

var result = find(data).where({
  'title': /\d$/
}).orderBy('userId', 'desc');

console.log('result', result)