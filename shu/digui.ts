// 定义二叉树节点类
class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  // 构造函数：初始化节点值和左右子节点
  constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
let root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
// 前序遍历函数：根 -> 左 -> 右
function pre(node: TreeNode<number> | null): void {
  if (node === null) return; // 如果节点为空，直接返回

  console.log(node.val); // 1. 先访问根节点
  pre(node.left);        // 2. 递归遍历左子树
  pre(node.right);       // 3. 递归遍历右子树
}

pre(root); // 执行前序遍历，输出顺序：1, 2, 3

// 后序遍历函数：左 -> 右 -> 根
function post(node: TreeNode<number> | null): void {
  if (node === null) return; // 如果节点为空，直接返回

  post(node.left);  // 1. 先递归遍历左子树
  post(node.right); // 2. 再递归遍历右子树
  console.log(node.val); // 3. 最后访问根节点
}

// 中序遍历函数：左 -> 根 -> 右
function inorder(node: TreeNode<number> | null): void {
  if (node === null) return; // 如果节点为空，直接返回

  inorder(node.left);  // 1. 先递归遍历左子树
  console.log(node.val); // 2. 然后访问根节点
  inorder(node.right); // 3. 最后递归遍历右子树
}

function level(root: TreeNode<number> | null): void {
  if (root === null) return; // 如果根节点为空，直接返回

  const queue: TreeNode<number>[] = [root]; // 初始化队列，放入根节点
  while (queue.length > 0) {
    const node = queue.shift()!; // 从队列前端取出节点
    console.log(node.val); // 访问当前节点

    // 如果左子节点存在，加入队列
    if (node.left !== null) {
      queue.push(node.left);
    }

    // 如果右子节点存在，加入队列
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
}
