import Tree from "./binarySearchTrees.mjs";
import Node from "./node.mjs";

/////////
function generateRandomArray(length, min, max) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}
/// generate tree
/// generated using function above
const arrayOfRandomNumbers = [
  74, 48, 28, 40, 32, 32, 20, 69, 36, 92, 55, 79, 70, 17, 34, 50, 63, 80, 53,
  39, 35, 67, 86, 77, 78, 59, 47, 51, 72, 92,
];
const tree = new Tree(arrayOfRandomNumbers);
/// tests
// print levels
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

/// check if balanced

/* console.log(tree.isBalanced());
tree.prettyPrint();
 */
//
/// unbalance the tree

tree.insert(101);
tree.insert(200);
tree.insert(123);
tree.insert(111);
/* console.log(tree.isBalanced()) */ // ==> false

// balance the tree again
tree.rebalance();
console.log(tree.isBalanced()); // ==> true
tree.prettyPrint();
///
