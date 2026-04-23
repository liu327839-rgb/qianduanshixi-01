function preOrderIterative(root: TreeNode<number> | null): void {
  if (root === null) return;
    let stack: TreeNode<number>[] = [root];
  // 初始化栈，把树根放进去

  while (stack.length > 0) {
    // 1. 从 stack 拿出最上面的节点 (提示: ts 数组的弹栈方法是 pop())
    let node = stack.pop()!;//!的意思是告诉 TypeScript 编译器这个值不可能是 null 或 undefined，因为我们在 while 循环的条件中已经检查了 stack.length > 0，所以 stack.pop() 不会返回 undefined。其实可以不写，但是会标红，有点烦
    // 2. 打印它的值
    console.log(node.val);
    // 3. 如果有右孩子，把右孩子推入 stack (提示: 推入方法是 push())
    if (node.right) {
      stack.push(node.right);
    }
    // 4. 如果有左孩子，把左孩子推入 stack
    if (node.left) {
      stack.push(node.left);
    }
  }
}

function inOrderIterative(root: TreeNode<number> | null): void {
  let stack: TreeNode<number>[] = [];
  let curr = root;


  while (curr !== null || stack.length > 0) {
      
     
      while(curr!=null){stack.push(curr);curr=curr.left}

     
      let node=stack.pop()!;
      console.log(node.val);
      curr=node.right
  }
}

function postOrderIterative(root: TreeNode<number> | null): number[] {
  if (root === null) return [];

  let stack = [root];
  let result: number[] = []; // 1. 答案盒子放在循环外面

  while (stack.length > 0) {
    let node = stack.pop()!;
    result.unshift(node.val); // 2. 每次塞到最前面

    if (node.left) stack.push(node.left);   // 3. 先压左
    if (node.right) stack.push(node.right); // 4. 后压右（保证右在最上面，下次先弹出）
  }

  return result;
}