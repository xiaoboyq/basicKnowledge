/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if(!root.val) {
    return []
  } 
  let res = []

  function getValue(root) {
    if(root.left) {
      getValue(root.left)
    }
    res.push(root.val)
    if(root.right) {
      getValue(root.right)
    }
  }

  getValue(root)

  console.log(res);
  return res
};

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
} 

let data = TreeNode(1,null,2,3)
inorderTraversal()
