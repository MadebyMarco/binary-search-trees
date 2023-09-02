function node(data = null, left = null, right = null) {
  return {
    data,
    left,
    right
  };
}

function tree(array) {
  array = mergeSort(array);
  let root = buildTree(array, 0, array.length - 1);

  function insert(value) {
    const newNode = node(value);

    if (this.root == null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    let previous = null;
    while (current != null) {
      if (value > current.data) {
        previous = current;
        current = current.right;
      } else if (value < current.data) {
        previous = current;
        current = current.left;
      } else if (value == current.data) {
        console.error("This value already exists");
        return;
      }
    }

    if (value > previous.data) {
      previous.right = newNode;
    } else previous.left = newNode;
    console.log(`finished inserting ${newNode.data}`);
  }
  //taken from geeksforgeeks
  function deleteNode(value, root = this.root) {
    // Base case
    if (root === null) {
      return root;
    }

    // Recursive calls for ancestors of
    // node to be deleted
    if (root.data > value) {
      root.left = deleteNode(value, root.left);
      return root;
    } else if (root.data < value) {
      root.right = deleteNode(value, root.right);
      return root;
    }

    // We reach here when root is the node
    // to be deleted.

    // If one of the children is empty
    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
      // Delete successor.  Since successor
      // is always left child of its parent
      // we can safely make successor's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ.right to succParent.right
      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      // Copy Successor Data to root
      root.data = succ.data;

      // Delete Successor and return root
      delete succ;
      return root;
    }
  }

  function find(value) {
    let current = this.root;
    let previous = null;
    while (current != null) {
      if (value > current.data) {
        previous = current;
        current = current.right;
      } else if (value < current.data) {
        previous = current;
        current = current.left;
      } else if (value == current.data) {
        return current;
      }
    }
    console.error("The value you are looking for could not be found");
    return null;
  }

  function levelOrder(callback) {
    let rootNode = this.root;
    if (rootNode == null) return;
    const queue = [];
    const values = [];
    queue.push(rootNode);
    let i = 0;
    while (queue.length > 0 && i < 50) {
      let current = queue[0];
      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);

      if (callback) callback(current);
      values.push(current.data);
      queue.shift();
      i++;
    }
    if (!callback) return values;
    return "Level order call back completed";
  }

  function preorder(callback) {
    const stack = [this.root];
    const values = [];
    while (stack.length) {
      let current = stack.pop();
      values.push(current.data);
      if (callback) callback(current);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
    if (!callback) return values;
  }

  function inorder(callback) {
    const values = [];
    const stack = [];
    let finished = false;
    let current = this.root;
    while (!finished) {
      if (current != null) {
        stack.push(current);
        current = current.left;
      } else {
        if (stack.length != 0) {
          let popped = stack.pop();
          if (callback) callback(popped);
          values.push(popped.data);
          current = popped.right;
        } else finished = true;
      }
    }

    if (!callback) return values;
  }

  function postorder(callback) {
    const values = [];
    const stack = [];
    const stack2 = [];
    stack.push(this.root);
    while (stack.length != 0) {
      let current = stack.pop();
      stack2.push(current);
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
    while (stack2.length != 0) {
      let current = stack2.pop();
      if (callback) callback(current);
      values.push(current.data);
    }
    if (!callback) return values;
  }

  function height(node = this.root) {
    if (node == null) return 0;
    else {
      /* compute the depth of each subtree */
      let lDepth = height(node.left);
      let rDepth = height(node.right);
      /* use the larger one */

      if (lDepth > rDepth) return lDepth + 1;
      else return rDepth + 1;
    }
  }

  function isBalanced() {
    const lDepth = height(this.root.left);
    const rDepth = height(this.root.right);
    if (lDepth - rDepth > 1 || rDepth - lDepth > 1) return false;
    return true;
  }

  function rebalance() {
    const currentRootArray = this.levelOrder();
    const sortedRoot = mergeSort(currentRootArray);
    const newRoot = buildTree(sortedRoot, 0, sortedRoot.length - 1);
    this.root = newRoot;
    return newRoot;
  }

  return {
    array,
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    isBalanced,
    rebalance
  };
}

function buildTree(array, start, end) {
  if (start > end) return null;
  const middle = parseInt((start + end) / 2);
  const rootNode = node(array[middle]);
  rootNode.left = buildTree(array, start, middle - 1);
  rootNode.right = buildTree(array, middle + 1, end);
  return rootNode;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function mergeSort(array) {
  if (array.length < 2) return array;
  const mid = Math.floor(array.length / 2);
  const leftArr = array.slice(0, mid);
  const rightArr = array.slice(mid);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr) {
  let temporaryArr = [];
  while (leftArr.length + rightArr.length > 0) {
    if (leftArr.length < 1) {
      temporaryArr.push(...rightArr.splice(0, 1));
    }
    if (rightArr.length < 1) {
      temporaryArr.push(...leftArr.splice(0, 1));
    }
    //remove dupes
    if (leftArr[0] == rightArr[0]) leftArr.shift();

    if (leftArr[0] < rightArr[0]) {
      temporaryArr.push(...leftArr.splice(0, 1));
    } else temporaryArr.push(...rightArr.splice(0, 1));
  }

  return temporaryArr;
}
// let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const newTree = tree(testArray);

// console.log(deleteNode(newTree.root, 4));
// newTree.deleteNode(4);
// prettyPrint(newTree.root);
// console.log(newTree.find(7));
// console.log(newTree.levelOrder());
// console.log(newTree.preorder());
// console.log(newTree.inorder());
// console.log(newTree.postorder());
// console.log(newTree.height());
// console.log(newTree.isBalanced());
// console.log(newTree.rebalance());

//Odin tie it all together
const odinArray = [
  6,
  8,
  9,
  10,
  11,
  13,
  18,
  22,
  24,
  33,
  49,
  50,
  51,
  56,
  58,
  59,
  61,
  63,
  73,
  82,
  85,
  87,
  96
];

const odinTree = tree(odinArray);
console.log("Is balanced", odinTree.isBalanced());
console.log("Level order ", odinTree.levelOrder());
console.log("Pre order ", odinTree.preorder());
console.log("In order ", odinTree.inorder());
console.log("Post order ", odinTree.postorder());
odinTree.insert(101);
odinTree.insert(294);
odinTree.insert(321);
console.log("Is balanced", odinTree.isBalanced());
odinTree.rebalance();
console.log("Is balanced", odinTree.isBalanced());
console.log("Level order ", odinTree.levelOrder());
console.log("Pre order ", odinTree.preorder());
console.log("In order ", odinTree.inorder());
console.log("Post order ", odinTree.postorder());
