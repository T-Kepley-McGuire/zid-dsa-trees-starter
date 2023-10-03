const Queue = require("./Queue");

class BinarySearchTree {
  // your code here

  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      console.log(this);
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key not found");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const sucessor = this.right._findMin();
        this.key = sucessor.key;
        this.value = sucessor.value;
        sucessor.remove(sucessor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key not found");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfsInOrder(values = []) {
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }
    values.push(this.value);
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }
    return values;
  }

  dfsPreOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }
    values.push(this.value);
    return values;
  }

  bfs(tree, values = []) {
    const queue = new Queue();
    queue.enqueue(tree);
    let node = queue.dequeue();
    while (node) {
      values.push(node.value);

      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
      node = node.dequeue();
    }

    return values;
  }

  height() {
    const leftHeight = this.left ? this.left.height() + 1 : 0;
    const rightHeight = this.right ? this.right.height() + 1 : 0;

    return Math.max(leftHeight, rightHeight);
  }
}

function isBST(tree) {
  const values = tree.dfsInOrder();
  for (let i = 1; i < values.length; i++)
    if (values[i] < values[i - 1]) return false;

  return true;
}

function nthLargestNode(tree, n) {
  const values = tree.dfsInOrder();
  return values[values.length-n];
}

const bst = new BinarySearchTree(5, 5);
bst.insert(2, 2);
bst.insert(19, 19);
bst.insert(15, 15);
bst.insert(28, 28);
bst.insert(18, 18);
bst.insert(30, 30);
bst.insert(31, 31);

console.log(bst);
console.log(nthLargestNode(bst, 3));


