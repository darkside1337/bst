import Node from "./node.mjs";

///
export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sortAndRemoveDuplicates(arr));
  }
  //
  /// function to sort and remove duplicates
  //
  mergeSort(arr) {
    // base case
    if (arr.length <= 1) return arr;

    /// get the middle index
    let middle = Math.floor(arr.length / 2);
    /// split the array into two equivalent (approximately) arrays
    let [left, right] = [arr.slice(0, middle), arr.slice(middle)];
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  ///
  merge(leftArr, rightArr) {
    /// array which my sub-elements are going to merge into
    let merged = [];
    // default starting indexes
    let leftIndex = 0;
    let rightIndex = 0;

    /// compare values of arrays at index, then increment index

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        merged.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        merged.push(rightArr[rightIndex]);
        rightIndex++;
      }
    }
    while (leftIndex < leftArr.length) {
      merged.push(leftArr[leftIndex]);
      leftIndex++;
    }
    while (rightIndex < rightArr.length) {
      merged.push(rightArr[rightIndex]);
      rightIndex++;
    }

    return merged;
  }
  // clean up the array
  sortAndRemoveDuplicates(arr) {
    const removeDuplicates = new Set(arr);
    let cleaned = [...removeDuplicates];
    let cleanedAndSorted = this.mergeSort(cleaned);
    return cleanedAndSorted;
  }
  /// build tree from array
  buildTree(arr, start = 0, end = arr.length - 1) {
    // base case
    if (start > end) return null;
    //
    // get middle element and make it root
    //
    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);
    // Recursively construct the left & right subtrees and make them left/right children of root
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    // return the node
    return node;
  }

  // insert method
  insert(value) {
    this.root = this.insertRec(this.root, value);
  }
  insertRec(node, value) {
    // base case when reaching a leaf node
    if (node === null) {
      return new Node(value);
    }
    // traversing
    if (value < node.data) {
      node.left = this.insertRec(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertRec(node.right, value);
    }
    return node;
  }
  /// delete node
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }
  deleteNode(current, value) {
    // base case:
    if (current === null) return current;
    /// deletion cases
    if (value === current.data) {
      // case 01: (no children)
      if (current.left === null && current.right === null) {
        return null;
      }
      /// case 02: (single child)
      else if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        // case 03: (two children)
        let tempNode = this.getSmallestNode(current.right);
        current.data = tempNode.data;
        // delete inOrder successor
        current.right = this.deleteNode(current.right, tempNode.data);
        return current;
      }
    } else if (value < current.data) {
      current.left = this.deleteNode(current.left, value);
      return current;
    } else {
      current.right = this.deleteNode(current.right, value);
      return current;
    }
  }
  /// find function
  find(value) {
    return this.findRec(this.root, value);
  }
  findRec(current, value) {
    // base case
    if (current === null) {
      return "Not Found";
    }
    // if found
    if (current.data === value) {
      return current;
    }
    // traverse and keep looking
    if (value > current.data) {
      return this.findRec(current.right, value);
    } else if (value < current.data) {
      return this.findRec(current.left, value);
    }
  }
  // level order traversal
  levelOrder(cb, node = this.root) {
    if (node === null) return;
    const queue = [node];
    const visitedNodes = [];

    //
    while (queue.length !== 0) {
      let current = queue.shift();
      visitedNodes.push(current.data);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    if (cb) {
      queue.forEach((node) => {
        cb(node);
      });
    } else {
      return visitedNodes;
    }
  }
  // preOrder Traversal
  preOrder(cb, node = this.root, visitedNodes = []) {
    if (node === null) return;

    cb ? cb(node) : visitedNodes.push(node.data);
    this.preOrder(cb, node.left, visitedNodes);
    this.preOrder(cb, node.right, visitedNodes);
    if (visitedNodes.length !== 0) {
      return visitedNodes;
    }
  }
  // inOrder Traversal
  inOrder(cb, node = this.root, visitedNodes = []) {
    if (node === null) return;

    this.inOrder(cb, node.left, visitedNodes);
    cb ? cb(node) : visitedNodes.push(node.data);
    this.inOrder(cb, node.right, visitedNodes);
    if (visitedNodes.length !== 0) {
      return visitedNodes;
    }
  }
  // postOrder Traversal
  postOrder(cb, node = this.root, visitedNodes = []) {
    if (node === null) return;

    this.postOrder(cb, node.left, visitedNodes);
    this.postOrder(cb, node.right, visitedNodes);
    cb ? cb(node) : visitedNodes.push(node.data);
    if (visitedNodes.length !== 0) {
      return visitedNodes;
    }
  }
  /// get smallest node from node
  getSmallestNode(node) {
    while (!node.left === null) {
      node = node.left;
    }
    return node;
  }
  // find the height of the tree
  height(root = this.root) {
    if (root === null) {
      return -1;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  // find the depth of the tree
  depth(node, root = this.root, depth = 0) {
    // failsafe
    if (root === null || node === null) return;
    // if node is found
    if (node === root) {
      return `The depth of this node is: ${depth}`;
    }
    // recurse
    if (node.data < root.data) {
      return this.depth(node, root.left, (depth += 1));
    } else if (node.data > root.data) {
      return this.depth(node, root.right, (depth += 1));
    }
  }
  // is my tree balanced
  isBalanced(root = this.root) {
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    const difference = Math.abs(leftHeight - rightHeight);
    return difference <= 1 ? true : false;
  }
  // rebalance the tree
  rebalance() {
    let arr = this.levelOrder();
    return (this.root = this.buildTree(this.sortAndRemoveDuplicates(arr)));
  }
  /// pretty Print
  //
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
