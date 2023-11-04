# Binary Search Tree (BST) Implementation

This project provides a Binary Search Tree (BST) implementation in JavaScript. A BST is a data structure used for efficient storage and retrieval of data in a sorted order. This implementation offers various features, including insertion, deletion, searching, and balancing of the tree.

## Features

- **BST Creation**: Create a BST from an array, automatically sorting and removing duplicate values.

- **Insertion**: Insert a new node with a specified value into the tree.

- **Deletion**: Remove a node with a specified value from the tree, maintaining the BST properties.

- **Searching**: Find a specific value in the BST and return the node containing the value or "Not Found" if not present.

- **Traversals**: Perform pre-order, in-order, post-order, or level-order traversals of the tree.

- **Height Calculation**: Calculate the height of the tree or a specific node within the tree.

- **Depth Calculation**: Determine the depth of a specific node in the tree.

- **Balancing**: Check if the tree is balanced (the height difference between the left and right subtrees is at most 1) and rebalance the tree if necessary.

- **Pretty Printing**: Display a visually appealing representation of the BST structure.

## Usage

1. Create a BST by providing an array of values.

2. Perform operations like insertion, deletion, searching, and traversals on the tree.

3. Check the balance of the tree and rebalance it if needed.

4. Visualize the structure of the tree using the pretty print function.

## Example

```javascript
// Create a BST from an array of random numbers
const arrayOfRandomNumbers = [
  /* ... */
];
const tree = new Tree(arrayOfRandomNumbers);

// Insert, delete, search, and perform various tree operations
tree.insert(101);
tree.delete(50);
const searchedNode = tree.find(123);

// Check the balance of the tree and rebalance it
if (!tree.isBalanced()) {
  tree.rebalance();
}

// Visualize the tree structure
tree.prettyPrint();
```
