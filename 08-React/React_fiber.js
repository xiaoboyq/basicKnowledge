//一个简单的react  fiber 架构。 

// 1.定义jsx
let style = {color: 'green', border: '1px solid red', margin: '5px'};


let A = {
  type: 'div',
  key: 'A',
  props: {
    style,
    children: [
      { type: 'div', key: 'B1', props: {style, children: []} },
      { type: 'div', key: 'B2', props: {style, children: []} }
    ]
  }
}

const TAG_ROOT = 'TAG_ROOT';
const Placement = 'Placement';
const TAG_HOST = 'TAG_HOST';

let root = document.getElementById('root');

// 开始我的工作循环
// 表示一个工作单元，表示正在处理的fiber
let workInProgress;
let rootFiber = {
  tag: TAG_ROOT,
  key: 'ROOT',
  stateNode: root,
  props: { children: [A]}
}

workInProgress = rootFiber

workLoop()

function workLoop() {
  while(workInProgress) {
    workInProgress =  performUnitOfWork(workInProgress)
  }

  commitRoot()
}
function commitRoot() {
  let currentEffect =  rootFiber.firstEffect;
  console.log('currentEffect', rootFiber)

  while(currentEffect) {
    let flags = currentEffect.flags;
    switch(flags) {
      case Placement:
         commitPlacement(currentEffect);
        break;
        default:
        break;
    }
    currentEffect = currentEffect.nextEffect;
  }
}

function commitPlacement(currentEffect) {
  console.log('currentEffect', currentEffect)
  const parent = currentEffect.return.stateNode;
  parent.appendChild(currentEffect.stateNode)
}


function performUnitOfWork(workInProgress) {
  beginWork(workInProgress);
  if(workInProgress.child) {
    return workInProgress.child
  }

  while(workInProgress) {
    completeUnitOfWork(workInProgress);
    if(workInProgress.sibling) {
      return workInProgress.sibling
    }
    workInProgress = workInProgress.return
  }
}

function completeUnitOfWork(workInProgress) {
  // let stateNode;
  console.log('completeUnitOfWork', workInProgress)
  switch(workInProgress.tag) {
    case TAG_HOST:
      createStateNode(workInProgress)
      break;
  }

  makeEffectList(workInProgress);
}


function makeEffectList(completeWork) {
  let returnFiber = completeWork.return;
  if(returnFiber) {
    if(!returnFiber.firstEffect) {
      returnFiber.firstEffect = completeWork.firstEffect
    } 
    if(returnFiber.lastEffect) {
      if(returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork.firstEffect
      }
      returnFiber.lastEffect = completeWork.lastEffect
    }

    if(completeWork.flags) {
      if(returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completeWork;
      } else {
        returnFiber.firstEffect = completeWork
      }
      returnFiber.lastEffect = completeWork
    }
  }
}

function createStateNode(fiber) {
  fiber.stateNode = document.createElement(fiber.type);
}


function beginWork(workInProgress) {
  console.log('beginWork', workInProgress.key)
  const nextChildren = workInProgress.props.children;
  reconcileChildren(workInProgress, nextChildren)
}


function reconcileChildren(returnFiber, nextChildren) {
  let firstChildFiber;
  let previousFiber;
  for(let i = 0; i < nextChildren.length; i++) {
    let newFiber = createFiber(nextChildren[i]);
    newFiber.flags = Placement;
    newFiber.return = returnFiber;
    if(!firstChildFiber) {
      firstChildFiber = newFiber
    } else {
      previousFiber.sibling = newFiber
    }
    previousFiber = newFiber;
  }
  returnFiber.child = firstChildFiber;
  return firstChildFiber
}

function createFiber(element) {
  return {
    type: element.type,
    tag: TAG_HOST,
    key: element.key,
    props: element.props,
  }
}