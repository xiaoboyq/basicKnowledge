/**
 * 二叉树
*/
interface ITreeNode {
  value: number,
  left: ITreeNode | null,
  right: ITreeNode | null,
}


const array: number[] = []

/**
 * 先序遍历
*/

function preOrderTraverse(node: ITreeNode|null) {
  if(node === null) return
  console.log(node.value)
  array.push(node.value)
  preOrderTraverse(node.left);
  preOrderTraverse(node.right);
}

/**
 * 中序遍历
*/

function inOrderTraverse(node: ITreeNode|null) {
  if(node === null) return
  inOrderTraverse(node.left);
  console.log(node.value)
  array.push(node.value)
  inOrderTraverse(node.right);
}



/**
 * 后序遍历
*/

function postOrderTraverse(node: ITreeNode|null) {
  if(node === null) return
  postOrderTraverse(node.left);
  postOrderTraverse(node.right);
  console.log(node.value)
}



const bst:ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    }
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    }
  }
}

// inOrderTraverse(bst)

/**
 * binarySearchTree  BST  
 * 二叉搜索树 左边的值 小于中间的 中间的小于 右边的
 * 二叉搜索树的中序遍历会从小到大的排序
*/




// 求二叉搜索树中第k小的值
/**
 * 
*/
function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node)
  return array[k - 1] || null
}

console.log(getKthValue(bst, 3))