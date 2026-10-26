const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #root = null;

  root() {
    return this.#root;
  }

  add(data) {
    const { parent, node } = this.#locate(data);

    if (node !== null) {
      return;
    }

    const newNode = new Node(data);

    if (parent === null) {
      this.#root = newNode;
    } else if (data < parent.data) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  find(data) {
    return this.#locate(data).node;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    const { parent, node } = this.#locate(data);

    if (node === null) {
      return;
    }

    let replacement;

    if (node.left === null) {
      replacement = node.right;
    } else if (node.right === null) {
      replacement = node.left;
    } else {
      let successorParent = node;
      let successor = node.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent !== node) {
        successorParent.left = successor.right;
        successor.right = node.right;
      }

      successor.left = node.left;
      replacement = successor;
    }

    this.#replaceChild(parent, node, replacement);
  }

  min() {
    if (this.#root === null) {
      return null;
    }

    let node = this.#root;

    while (node.left !== null) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (this.#root === null) {
      return null;
    }

    let node = this.#root;

    while (node.right !== null) {
      node = node.right;
    }

    return node.data;
  }

  #locate(data) {
    let parent = null;
    let node = this.#root;

    while (node !== null) {
      if (data < node.data) {
        parent = node;
        node = node.left;
      } else if (data > node.data) {
        parent = node;
        node = node.right;
      } else {
        break;
      }
    }

    return { parent, node };
  }

  #replaceChild(parent, child, replacement) {
    if (parent === null) {
      this.#root = replacement;
    } else if (parent.left === child) {
      parent.left = replacement;
    } else {
      parent.right = replacement;
    }
  }
}

module.exports = {
  BinarySearchTree
};
