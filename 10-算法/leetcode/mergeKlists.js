/*
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if(lists.length <=1) {
        return lists[0] || []
    }

    function getNodeList(node1, node2, res) {
        if(!node1) {
            res.next = node2
            return
        }
        if(!node2) {
            res.next = node1
            return
        }
        if(node1.val <= node2.val) {
                res.next = node1;
                node1=node1.next;
                res = res.next
                getNodeList(node1, node2, res)
            } else {
               res.next = node2;
                node2 = node2.next;
                    res = res.next;
                getNodeList(node1, node2, res)
         }
    }
    let res = new ListNode(list[0]) ;
for(let i = 0; i < lists.length - 1; i++ ) {
    let node2 = lists[i + 1];
    let resNode =  new ListNode(res) ;
    getNodeList(res, node2, resNode)
}

return res.next
};