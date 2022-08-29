const deps = {
  "a.js": { deps: ["b.js", "e.js"], },
  "b.js": { deps: ["c.js"], },
  "c.js": { deps: ["d.js"] },
  "d.js": { deps: ["a.js"] }
}
function fn(deps) {
  let res = false;
  
  function deepTraversal(obj, key, nodeList) {
    if(!obj[key] || !obj[key].deps) {
      console.log(nodeList)
      return 
    }
    let children = obj[key].deps;
    for(let i = 0; i < children.length; i++ ) {
      if(nodeList.includes(children[i])) {
          res = true
          nodeList.push(children[i])
          return nodeList 
      } 
      if(!res) {
        nodeList.push(children[i])
        deepTraversal(obj, children[i], nodeList)
      }
    }
  }

  // deepTraversal(deps, 'b.js', nodeList = ['b.js'])
  for (const key in deps) {
    !res&&deepTraversal(deps, key, nodeList = [key])
  }

  console.log(res)
  return res
}

fn(deps)

