interface LinkListNode {
 value: number,
 next: LinkListNode | null
}

class myQueue {
  private head: LinkListNode | null = null;
  private tail: LinkListNode | null = null;
  private len = 0

  // 入队
  add(n: number) {
    const newNode: LinkListNode = {
      value: n,
      next: null
    }

    if(this.head === null) {
      this.head = newNode
    }

    const tailNode = this.tail;
    if(tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;

    this.len++;

  }

  // 出队
  delete(): number | null {
    const headNode = this.head;
    if(headNode === null || this.len <= 0) return null;

    const value = headNode.value;
    
    this.head = headNode.next;
    this.len--;
    return value
  }
  get length(): number {
    return this.len
  }
}