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

// 创建一个简单的二叉树示例：根节点1，左子节点2，右子节点3
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
