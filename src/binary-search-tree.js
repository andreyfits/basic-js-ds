const {NotImplementedError} = require('../extensions/index.js');
const {Node} = require("../extensions/list-tree");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {

    root() {
        return this.node || null;
    }

    add(data) {
        const node = new Node(data);

        if (!this.node) {
            this.node = node;
        } else {
            let currentNode = this.node;

            while (currentNode) {
                if (node.data < currentNode.data) {
                    if (!currentNode.left) {
                        currentNode.left = node;
                        break;
                    }
                    currentNode = currentNode.left;
                } else {
                    if (!currentNode.right) {
                        currentNode.right = node;
                        break;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }

    has(data) {
        return !!this.find(data);
    }

    find(data) {
        let currentNode = this.node;

        while (currentNode) {
            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else if (data > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }

        return null;
    }

    remove(data, node = this.node) {
        if (!node || !this.has(data)) {
            return null;
        }

        if (data < node.data) {
            node.left = this.remove(data, node.left);
        } else if (data > node.data) {
            node.right = this.remove(data, node.right);
        } else {
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                node.data = this.min(node.right);
                node.right = this.remove(node.data, node.right);
            }
        }

        return node;
    }

    min(node = this.node) {
        let min = node.data || null;
        let currentNode = node;

        while (currentNode) {
            if (!min || currentNode.data < min) {
                min = currentNode.data;
            }
            currentNode = currentNode.left;
        }

        return min;
    }

    max(node = this.node) {
        let max = node.data || null;
        let currentNode = node;

        while (currentNode) {
            if (!max || currentNode.data > max) {
                max = currentNode.data;
            }
            currentNode = currentNode.right;
        }

        return max;
    }
}

module.exports = {
    BinarySearchTree
};
