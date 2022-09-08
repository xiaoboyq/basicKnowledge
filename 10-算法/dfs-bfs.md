# dfs

## dfs递归
```javascript
function deepFirstSearch(node, nodelist = []) {
  if(node) {
    nodelist.push(node);
    let children = node.children;
    for(let i = 0; i < children.length; i++ ) {
      deepFirstSearch(children[i], nodelist)
    }
  }
  return nodelist

}
```

## dfs 非递归 
```javascript
function deepFirstSearch(node) {
  let nodelist = [];
  if(node!==null) {
    let stack = [];
    stack.push(node);
    while(stack.length) {
      let itemNode = stack.pop();
      nodelist.push(itemNode)
      let children = itemNode.children
      for(let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }

  return nodelist
}
```

#  bfs 

## bfs 非递归 【推荐】 适用于层序遍历或者寻找最短路径的问。
``` javascript
function breadthFirstSearch(node) {
  let nodelist = [];
  if(node) {
    let queue = []
    queue.push(node)
    nodelist.push(node)
    while(queue.length) {
      let itemNode = queue.shift();
      let children = itemNode.children
      for(let i = 0; i <= children.length - 1; i++) {
        nodelist.push(children[i])
        queue.push(children[i])
      }
    }
  }
 return nodelist;
}

```