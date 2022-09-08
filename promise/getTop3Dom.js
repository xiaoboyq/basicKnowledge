function getTop3Dom() {
  // 获取所有的dom
  const elements = Array.from(document.querySelectorAll("*")) 
  let obj = {}
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i].tagName;
    obj[element] = ( obj[element] || 0) + 1
  }

  console.log('obj', obj)
  const sortedDom = Object.entries(obj).sort((a,b)=>b[1] - a[1])
  

  const top3 = sortedDom.slice(0, 3);

  const top3Dom = top3.map(v=> v[0])
  console.log(top3Dom)
}

//  不使用 querySelectorAll  给你一个html节点 怎么做
function getTop3Dom() {
 
    const html = document.querySelector('html');

    let obj = {}

    function getChildDom(parent) {
      const element = parent.tagName;
      obj[element] = ( obj[element] || 0) + 1

      for (let i = 0; i < parent.children.length; i++) {
        getChildDom(parent[i])
      }
    }
    getChildDom(html)
    // const elements = Array.from(document.querySelectorAll("*")) 
   
    const sortedDom = Object.entries(obj).sort((a,b)=>b[1] - a[1])
  
    const top3 = sortedDom.slice(0, 3);
  
    const top3Dom = top3.map(v=> v[0])
    console.log(top3Dom)
}