# LeetCode 刷题

<u>参考[代码随想录学习](https://programmercarl.com/)</u>

## 1 数组

### 704 二分查找

二分查找使用前提：**这道题目的前提是数组为有序数组**，同时题目还强调**数组中无重复元素**，因为一旦有重复元素，使用二分查找法返回的元素下标可能不是唯一的

找好区间 [left, right]

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length-1;
        while (left <= right) {
            int mid = left + ((right - left) / 2);
            if (nums[mid] > target) {
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
}
```

### 27 移除元素

方法一：单指针暴力法

指针从头到尾遍历数组，发现需要删除的数后整个数组从该位置整体前移一位，记录删除的个数

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int size = nums.length;
        // 从头到尾遍历数组
        for (int i = 0; i < size; i++) {
            // 发现删除的数后整体向前移一位
            if (nums[i] == val) {
                for (int j = i; j < size - 1; j++) {
                    nums[j] = nums[j + 1];
                }
                // 指针指向前移的数
                i--;
                // 删除了一个数 新数组大小减减
                size--;
            }
        }
        return size;
    }
}
```

方法二：双指针 快慢指针法 **通过一个快指针和慢指针在一个for循环下完成两个for循环的工作**

- 快指针：寻找新数组的元素，新数组就是不含有目标元素的数组
- 慢指针：指向更新 新数组下标的位置

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int slowIndex = 0;
        for (int fastIndex = 0; fastIndex < nums.length; fastIndex++) {
            // 判断是否为新数组的元素（不需要删除即为新数组元素）
            if (val != nums[fastIndex]) {
                nums[slowIndex++] = nums[fastIndex];
            }
        }
        return slowIndex;
    }
}
```

977 有序数组的平方

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1： 输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100] 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]

示例 2： 输入：nums = [-7,-3,2,3,11] 输出：[4,9,9,49,121]

**方法一**：暴力法 先平方再排序

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] res = new int[nums.length];
        int sqrt = 0;
        for (int i = 0; i < nums.length; i++) {
            nums[i]*=nums[i];
        }
        // 快速排序
        QuickSort(res);
        return res;
    }
}
```

方法二：双指针法 因为最大平方值肯定是出现再最两边数的平方，所以用两个指针指向数组两边 进行平方的比较，大者存入结果数组的末端（结果数组从大到小存），并且将两个指针向内收缩继续比较。

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] res = new int[nums.length];
        // k指针指向结果数组的最后一位，即最大位
        int k = nums.length - 1;
        // 双指针法
        for (int i = 0, j = nums.length - 1; i <= j;) {
            if (nums[i]*nums[i] < nums[j]*nums[j]) {
                res[k--] = nums[j]*nums[j];
                j--;
            } else {
                res[k--] = nums[i]*nums[i];
                i++;
            }
        }
        return res;
    }
}
```

### 209 长度最小的子数组

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

示例：

输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

提示：

- 1 <= target <= 10^9
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^5

**方法一**： 暴力解法

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int res = Integer.MAX_VALUE;
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum >= target) {
                    res = res > j - i + 1 ? j - i + 1 : res;
                    break;
                }
            }
        }
        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

**方法二**：滑动窗口法

窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。

窗口的起始位置如何移动：如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。

窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，也就是for循环里的索引

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int res = Integer.MAX_VALUE;
        int sum = 0;
        // 滑动窗口法
        int width = 0; // 窗口宽度
        for (int left = 0, right = 0; right < nums.length; right++) {
            sum += nums[right];
            // 当窗口之和大于目标时，左边界右移，窗口值减小
            while (sum >= target) {
                width = right - left + 1;
                res = res < width ? res : width;
                sum -= nums[left++];
            }
        }
        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

#### 练习 904 水果成篮

你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。

你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：

你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。

示例 1：

输入：fruits = [1,2,1]
输出：3
解释：可以采摘全部 3 棵树。
示例 2：

输入：fruits = [0,1,2,2]
输出：3
解释：可以采摘 [1,2,2] 这三棵树。
如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
示例 3：

输入：fruits = [1,2,3,2,2]
输出：4
解释：可以采摘 [2,3,2,2] 这四棵树。
如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
示例 4：

输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
输出：5
解释：可以采摘 [1,2,1,1,2] 这五棵树。

**方法**：滑动窗口法 

选用何种数据类型来存储窗口：纯数量问题选用int类型就行 涉及到多类型（比如本题的水果有多种类，需要分别记录数量）则使用Map来存储窗内数据

left right 其中right递增

**何时减小窗口**：窗口中的水果种类大于两种时

```java
class Solution {
    public int totalFruit(int[] fruits) {
        int res = 0;
        int width = 0;
        Map<Integer, Integer> cnt = new HashMap<Integer, Integer>();
        for (int left = 0, right = 0; right < fruits.length; ++right) {
            cnt.put(fruits[right], cnt.getOrDefault(fruits[right], 0) + 1);
            while (cnt.size() > 2) {
                cnt.put(fruits[left], cnt.get(fruits[left]) - 1);
                if (cnt.get(fruits[left]) == 0) {
                    cnt.remove(fruits[left]);
                }
                left++;
            }
            width = right - left + 1;
            res = res > width ? res : width;
        }
        return res;
    }
}
```

### 59 螺旋矩阵

给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

示例:

输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]

**方法**：把螺旋的运动分成多次的for循环 注意每次螺旋的变化

```java
class Solution {
    public int[][] generateMatrix(int n) {
        int[][] resMatrix = new int[n][n];
        int startX = 0, startY = 0; // 每个循环的起始位置
        int loop = n / 2;   // 循环几圈
        int cnt = 1;        // 每次移动的计数
        int offset = 1;     // 每循环一次 边界收缩一次
        int i, j;           // 行列指针
        while (loop-- > 0) {
            i = startX;
            j = startY;
            // 左到右
            for (; j < n - offset; j++) {
                resMatrix[i][j] = cnt++;
            }
            // 上到下
            for (; i < n - offset; i++) {
                resMatrix[i][j] = cnt++;
            }
            // 右到左
            for (; j > startX; j--) {
                resMatrix[i][j] = cnt++;
            }
            // 下到上
            for (; i > startY; i--) {
                resMatrix[i][j] = cnt++;
            }
            // 进入下一圈 收缩一格
            offset++;
            startX++;
            startY++;
        }
        // 判断n为奇数情况 中间会有一个单独的数
        if (n % 2 != 0) {
            resMatrix[n/2][n/2] = n*n;
        }
        return resMatrix;
    }
}
```

## 2 链表

### 203 移除链表元素

题意：删除链表中等于给定值 val 的所有节点。

示例 1： 输入：head = [1,2,6,3,4,5,6], val = 6 输出：[1,2,3,4,5]

示例 2： 输入：head = [], val = 1 输出：[]

示例 3： 输入：head = [7,7,7,7], val = 7 输出：[]

**方法**：考虑到头指针可能为删除节点的情况，使用虚拟头指针next指向原head，再通过一个pre指针来连接新链表（遍历的过程还需要一个指针来遍历原链表）

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if (head == null) {
            return head;
        }
        ListNode dummy = new ListNode(-1, head);
        ListNode pre = dummy;   // 生成新链表的指针
        ListNode temp = head;   // 遍历原链表的指针
        // 使用temp遍历原链表
        while (temp != null) {
            // 发现需要删除节点则pre跳过
            if (temp.val == val) {
                pre.next = temp.next;
            } else {
                // 无需删除的节点连接上pre
                pre = temp;
            }
            temp = temp.next;
        }
        return dummy.next;
    }
}
```

### 707 设计链表

**方法一**：单链表

```java
//单链表
class ListNode {
    int val;
    ListNode next;
    ListNode(){}
    ListNode(int val) {
        this.val=val;
    }
}
class MyLinkedList {
    //size存储链表元素的个数
    int size;
    //虚拟头结点
    ListNode head;

    //初始化链表
    public MyLinkedList() {
        size = 0;
        head = new ListNode(0);
    }

    //获取第index个节点的数值，注意index是从0开始的，第0个节点就是头结点
    public int get(int index) {
        //如果index非法，返回-1
        if (index < 0 || index >= size) {
            return -1;
        }
        ListNode currentNode = head;
        //包含一个虚拟头节点，所以查找第 index+1 个节点
        for (int i = 0; i <= index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.val;
    }

    //在链表最前面插入一个节点，等价于在第0个元素前添加
    public void addAtHead(int val) {
        addAtIndex(0, val);
    }

    //在链表的最后插入一个节点，等价于在(末尾+1)个元素前添加
    public void addAtTail(int val) {
        addAtIndex(size, val);
    }

    // 在第 index 个节点之前插入一个新节点，例如index为0，那么新插入的节点为链表的新头节点。
    // 如果 index 等于链表的长度，则说明是新插入的节点为链表的尾结点
    // 如果 index 大于链表的长度，则返回空
    public void addAtIndex(int index, int val) {
        if (index > size) {
            return;
        }
        if (index < 0) {
            index = 0;
        }
        size++;
        //找到要插入节点的前驱
        ListNode pred = head;
        for (int i = 0; i < index; i++) {
            pred = pred.next;
        }
        ListNode toAdd = new ListNode(val);
        toAdd.next = pred.next;
        pred.next = toAdd;
    }

    //删除第index个节点
    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }
        size--;
        if (index == 0) {
            head = head.next;
        return;
        }
        ListNode pred = head;
        for (int i = 0; i < index ; i++) {
            pred = pred.next;
        }
        pred.next = pred.next.next;
    }
}
```

**方法二**：双向链表

```java
//双链表
class ListNode{
    int val;
    ListNode next,prev;
    ListNode() {};
    ListNode(int val){
        this.val = val;
    }
}


class MyLinkedList {  

    //记录链表中元素的数量
    int size;
    //记录链表的虚拟头结点和尾结点
    ListNode head,tail;

    public MyLinkedList() {
        //初始化操作
        this.size = 0;
        this.head = new ListNode(0);
        this.tail = new ListNode(0);
        //这一步非常关键，否则在加入头结点的操作中会出现null.next的错误！！！
        head.next=tail;
        tail.prev=head;
    }

    public int get(int index) {
        //判断index是否有效
        if(index<0 || index>=size){
            return -1;
        }
        ListNode cur = this.head;
        //判断是哪一边遍历时间更短
        if(index >= size / 2){
            //tail开始
            cur = tail;
            for(int i=0; i< size-index; i++){
                cur = cur.prev;
            }
        }else{
            for(int i=0; i<= index; i++){
                cur = cur.next; 
            }
        }
        return cur.val;
    }

    public void addAtHead(int val) {
        //等价于在第0个元素前添加
        addAtIndex(0,val);
    }

    public void addAtTail(int val) {
        //等价于在最后一个元素(null)前添加
        addAtIndex(size,val);
    }

    public void addAtIndex(int index, int val) {
        //index大于链表长度
        if(index>size){
            return;
        }
        //index小于0
        if(index<0){
            index = 0;
        }
        size++;
        //找到前驱
        ListNode pre = this.head;
        for(int i=0; i<index; i++){
            pre = pre.next;
        }
        //新建结点
        ListNode newNode = new ListNode(val);
        newNode.next = pre.next;
        pre.next.prev = newNode;
        newNode.prev = pre;
        pre.next = newNode;

    }

    public void deleteAtIndex(int index) {
        //判断索引是否有效
        if(index<0 || index>=size){
            return;
        }
        //删除操作
        size--;
        ListNode pre = this.head;
        for(int i=0; i<index; i++){
            pre = pre.next;
        }
        pre.next.next.prev = pre;
        pre.next = pre.next.next;
    }
}
```

### 206 反转链表

题意：反转一个单链表。

示例: 输入: 1->2->3->4->5->NULL 输出: 5->4->3->2->1->NULL

**方法**：前后双指针法

双指针不断向后移动，反转两个指针指向节点的next（注意在反转之前应当保存之后的节点，否则反转后会丢失连接）

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {

        ListNode temp = head;   // 遍历原链表的指针
        ListNode cur = temp;    // 前指针
        ListNode pre = null;    // 后指针

        while (temp != null) {
            // 先保存反转的两个节点之后的节点
            temp = cur.next;
            // cur 指向后一个节点，pre 指向前一个节点，两节点反转
            cur.next = pre;
            // pre 和 cur 向后移动一位
            pre = cur;
            cur = temp;
        }
        return pre;
    }
}
```

### 24 两两交换链表中的节点

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

**方法**：虚拟链表头 （**链表操作注意顺序**）

![24.两两交换链表中的节点1](https://code-thinking.cdn.bcebos.com/pics/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B91.png)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode swapPairs(ListNode head) {
        // 判断链表是否为空
        if (head == null) {
            return head;
        }
        ListNode virtulHead = new ListNode(0);
        virtulHead.next = head;
        ListNode cur =virtulHead;
        while (cur.next != null && cur.next.next != null) {
            ListNode temp = cur.next;
            ListNode temp1 = cur.next.next.next;
            // 交换 对应上方三步
            cur.next = cur.next.next;
            cur.next.next = temp;
            cur.next.next.next = temp1;
            // cur后移两位 下一轮交换
            cur = cur.next.next;
        }
        return virtulHead.next;
    }
}
```

### 19 删除链表的的倒数第N个节点

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点

**方法**：快慢指针 快慢指针之间间距为 n+1 保证在快指针遍历到头时，慢指针指向要删除的节点前一位

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // 虚拟头
        ListNode virtulHead = new ListNode(0, head);
        // 前后双指针
        ListNode cur = virtulHead;
        ListNode pre = virtulHead;
        // 前指针后移n位
        while (n-- != 0) {
            cur = cur.next;
            // 删除的节点大于链表长度
            if (cur == null) {
                return null;
            }
        }
        // 双指针后移 pre的后一位即为倒数第n位
        cur = cur.next;
        while (cur != null) {
            cur = cur.next;
            pre = pre.next;
        }
        // 删除pre后的节点
        pre.next = pre.next.next;

        return virtulHead.next;
    }
}
```

### 160 链表相交

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

**方法**：简单来说，就是求两个链表交点节点的**指针**。 这里同学们要注意，交点不是数值相等，而是指针相等。

为了方便举例，假设节点元素数值相等，则节点指针相等。

看如下两个链表，目前curA指向链表A的头结点，curB指向链表B的头结点：

![面试题02.07.链表相交_1](https://code-thinking.cdn.bcebos.com/pics/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4_1.png)

我们求出两个链表的长度，并求出两个链表长度的差值，然后让curA移动到，和curB 末尾对齐的位置，如图：

![面试题02.07.链表相交_2](https://code-thinking.cdn.bcebos.com/pics/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4_2.png)

此时我们就可以比较curA和curB是否相同，如果不相同，同时向后移动curA和curB，如果遇到curA == curB，则找到交点。

否则循环退出返回空指针。

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode curA = headA;
        ListNode curB = headB;
        int lenA = 0, lenB = 0;
        while (curA != null) { // 求链表A的长度
            lenA++;
            curA = curA.next;
        }
        while (curB != null) { // 求链表B的长度
            lenB++;
            curB = curB.next;
        }
        curA = headA;
        curB = headB;
        // 让curA为最长链表的头，lenA为其长度
        if (lenB > lenA) {
            //1. swap (lenA, lenB);
            int tmpLen = lenA;
            lenA = lenB;
            lenB = tmpLen;
            //2. swap (curA, curB);
            ListNode tmpNode = curA;
            curA = curB;
            curB = tmpNode;
        }
        // 求长度差
        int gap = lenA - lenB;
        // 让curA和curB在同一起点上（末尾位置对齐）
        while (gap-- > 0) {
            curA = curA.next;
        }
        // 遍历curA 和 curB，遇到相同则直接返回
        while (curA != null) {
            if (curA == curB) {
                return curA;
            }
            curA = curA.next;
            curB = curB.next;
        }
        return null;
    }
}
```

### 142 环形链表

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

**方法**：

1. **判断链表是否有环**
   
   可以使用快慢指针法，分别定义 fast 和 slow 指针，从头结点出发，fast指针每次移动两个节点，slow指针每次移动一个节点，如果 fast 和 slow指针在途中相遇 ，说明这个链表有环。

2. **如果有环，如何找到这个环的入口**
   
   这就意味着，**从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点**。

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        // 快慢指针法
        // 1. 判断是否有环 快指针一次走两步 慢指针一次走一步
        ListNode fast = head;
        ListNode slow = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            // 快慢指针相遇 说明有环
            if (fast == slow) {
                // 在头节点处定义一个新指针 与相遇处的指针同时运动 两指针相遇节点为环入口
                ListNode index = head;
                while (index != slow) {
                    index = index.next;
                    slow = slow.next;
                }
                return index;
            }
        }
        return null;
    }
}
```

## 3 字符串

### 344 反转字符串

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `s` 的形式给出。

**方法**：双指针法 两指针分别指向头和尾 交换指向的数

```java
class Solution {
    public void reverseString(char[] s) {
        if (s.length == 0 || s.length == 1) {
            return;
        }
        // 双指针法 头尾指针指向的char交换
        int fast = s.length - 1;
        int slow = 0;
        char temp;
        while (slow < fast) {
            // 交换
            temp = s[slow];
            s[slow] = s[fast];
            s[fast] = temp;
            //
            slow++;
            fast--;
        }
        return;
    }
}
```

### 541 反转字符串2

给定一个字符串 s 和一个整数 k，从字符串开头算起, 每计数至 2k 个字符，就反转这 2k 个字符中的前 k 个字符。

如果剩余字符少于 k 个，则将剩余字符全部反转。

如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。

示例:

输入: s = "abcdefg", k = 2
输出: "bacdfeg"

**方法**：其实在遍历字符串的过程中，只要让 i += (2 * k)，i 每次移动 2 * k 就可以了，然后判断是否需要有反转的区间。

因为要找的也就是每2 * k 区间的起点，这样写，程序会高效很多。

```java
class Solution {
    public String reverseStr(String s, int k) {
        char[] ch = s.toCharArray();
        for(int i = 0; i < ch.length; i += 2 * k){
            int start = i;
            // 判断尾数够不够k个来取决end指针的位置
            int end = Math.min(ch.length - 1,start + k - 1);
            reverseString(ch, start, end);
        }
        return new String(ch);
    }

    public void reverseString(char[] s, int start, int end) {
        // 双指针法 头尾指针指向的char交换
        int fast = end;
        int slow = start;
        char temp;
        while (slow < fast) {
            // 交换
            temp = s[slow];
            s[slow] = s[fast];
            s[fast] = temp;
            //
            slow++;
            fast--;
        }
        return;
    }
}
```

### 剑指Offer 05 替换空格

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

方法：将空格换成多个字符 改变了字符串的长度 所以使用StringBuilder

遍历字符串数组，遇到非空格就append 遇到空格就append"%20"

```java
class Solution {
    public String replaceSpace(String s) {
        StringBuilder stringBuilder = new StringBuilder();
        for (char c: s.toCharArray()) {
            if (c != ' ') {
                stringBuilder.append(c);
            } else {
                stringBuilder.append("%20");
            }
        }
        return stringBuilder.toString();
    }
}
```

### 151 翻转字符串里的单词

给定一个字符串，逐个翻转字符串中的每个单词。

示例 1：
输入: "the sky is blue"
输出: "blue is sky the"

示例 2：
输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

示例 3：
输入: "a good  example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

**方法**：/**
     * 1.去除首尾以及中间多余空格
          * 2.反转整个字符串
          * 3.反转各个单词
               */

```java
class Solution {
    public String reverseWords(String s) {
        // 1.去除首尾以及中间多余空格
        StringBuilder sb = removeSpace(s);
        // 2.反转整个字符串
        reverseString(sb, 0, sb.length() - 1);
        // 3.反转各个单词
        reverseEachWord(sb);
        return sb.toString();
    }

    private StringBuilder removeSpace(String s) {
        // System.out.println("ReverseWords.removeSpace() called with: s = [" + s + "]");
        int start = 0;
        int end = s.length() - 1;
        while (s.charAt(start) == ' ') start++;
        while (s.charAt(end) == ' ') end--;
        StringBuilder sb = new StringBuilder();
        while (start <= end) {
            char c = s.charAt(start);
            if (c != ' ' || sb.charAt(sb.length() - 1) != ' ') {
                sb.append(c);
            }
            start++;
        }
        // System.out.println("ReverseWords.removeSpace returned: sb = [" + sb + "]");
        return sb;
    }

    /**
     * 反转字符串指定区间[start, end]的字符
     */
    public void reverseString(StringBuilder sb, int start, int end) {
        // System.out.println("ReverseWords.reverseString() called with: sb = [" + sb + "], start = [" + start + "], end = [" + end + "]");
        while (start < end) {
            char temp = sb.charAt(start);
            sb.setCharAt(start, sb.charAt(end));
            sb.setCharAt(end, temp);
            start++;
            end--;
        }
        // System.out.println("ReverseWords.reverseString returned: sb = [" + sb + "]");
    }

    private void reverseEachWord(StringBuilder sb) {
        int start = 0;
        int end = 1;
        int n = sb.length();
        while (start < n) {
            while (end < n && sb.charAt(end) != ' ') {
                end++;
            }
            reverseString(sb, start, end - 1);
            start = end + 1;
            end = start + 1;
        }
    }
}
```

### 剑指Offer58-II 左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"

**方法**：

1. 反转区间为前n的子串
2. 反转区间为n到末尾的子串
3. 反转整个字符串



```java
class Solution {
    public String reverseLeftWords(String s, int n) {
        char[] ch = s.toCharArray();
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = n; i < ch.length; i++) {
            stringBuilder.append(ch[i]);
        }
        for (int i = 0; i < n; i++) {
            stringBuilder.append(ch[i]);
        }
        return stringBuilder.toString();
    }
}
```

### 28 实现 strStr()

实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回 -1。

示例 1: 输入: haystack = "hello", needle = "ll" 输出: 2

示例 2: 输入: haystack = "aaaaa", needle = "bba" 输出: -1

说明: 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。

#### **方法1**：暴力遍历

```java
/**暴力法 */
class Solution {
    public int strStr(String haystack, String needle) {
        char[] haystackArr = haystack.toCharArray();
        char[] needleArr = needle.toCharArray();
        // 以haystack中的每一个字符为起点判断一次
        for (int i = 0; i < haystackArr.length; i++) {
            if (haystackArr.length - i + 1 < needleArr.length) {
                break;
            }
            for (int j = i, k = 0; j < haystackArr.length; j++, k++) {
                if (haystackArr[j] != needleArr[k]) {
                    break;
                }
                if (j - i + 1 == needleArr.length) {
                    return i;
                }
            }
        }
        return -1;
    }
}
```

#### **方法2**：KMP

- **KMP的主要思想**

  当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了。

- **什么是前缀表**

- 

  **前缀表是用来回退的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配**，要在文本串：aabaabaafa 中查找是否出现过一个模式串：aabaaf。

  ![KMP详解1](https://code-thinking.cdn.bcebos.com/gifs/KMP%E7%B2%BE%E8%AE%B21.gif)

  可以看出，文本串中第六个字符b 和 模式串的第六个字符f，不匹配了。如果暴力匹配，发现不匹配，此时就要从头匹配了。但如果使用前缀表，就不会从头匹配，而是从上次已经匹配的内容开始匹配，找到了模式串中第三个字符b继续开始匹配。

  那么什么是前缀表：**记录下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀。**

  ```java
  
  ```

- **怎么计算前缀表（next数组）**

  接下来就要说一说怎么计算前缀表。

  如图：

  ![KMP精讲5](https://code-thinking.cdn.bcebos.com/pics/KMP%E7%B2%BE%E8%AE%B25.png)

  长度为前1个字符的子串`a`，最长相同前后缀的长度为0。（注意字符串的**前缀是指不包含最后一个字符的所有以第一个字符开头的连续子串**；**后缀是指不包含第一个字符的所有以最后一个字符结尾的连续子串**。）

  ![KMP精讲6](https://code-thinking.cdn.bcebos.com/pics/KMP%E7%B2%BE%E8%AE%B26.png)

  长度为前2个字符的子串`aa`，最长相同前后缀的长度为1。

  ![KMP精讲7](https://code-thinking.cdn.bcebos.com/pics/KMP%E7%B2%BE%E8%AE%B27.png)

  长度为前3个字符的子串`aab`，最长相同前后缀的长度为0。

  以此类推： 长度为前4个字符的子串`aaba`，最长相同前后缀的长度为1。 长度为前5个字符的子串`aabaa`，最长相同前后缀的长度为2。 长度为前6个字符的子串`aabaaf`，最长相同前后缀的长度为0。

  那么把求得的最长相同前后缀的长度就是对应前缀表的元素，如图： ![KMP精讲8](https://code-thinking.cdn.bcebos.com/pics/KMP%E7%B2%BE%E8%AE%B28.png)

  可以看出模式串与前缀表对应位置的数字表示的就是：**下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀。**



```java
class Solution {
    //前缀表（不减一）Java实现
    public int strStr(String haystack, String needle) {
        if (needle.length() == 0) return 0;
        int[] next = new int[needle.length()];
        getNext(next, needle);    
        int j = 0;
            for (int i = 0; i < haystack.length(); i++) {
                while (j > 0 && needle.charAt(j) != haystack.charAt(i)) 
                    j = next[j - 1];
                if (needle.charAt(j) == haystack.charAt(i)) 
                    j++;
                if (j == needle.length()) 
                    return i - needle.length() + 1;
            }
            return -1;
        }

    private void getNext(int[] next, String s) {
        int j = 0;
        next[0] = 0;
        for (int i = 1; i < s.length(); i++) {
            while (j > 0 && s.charAt(j) != s.charAt(i)) 
                j = next[j - 1];
            if (s.charAt(j) == s.charAt(i)) 
                j++;
            next[i] = j; 
        }
    }
}
```
## 4 栈与队列

###  232 用栈实现队列

使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

**方法**：双栈 一个栈存数据，另一个栈用来在取数据时反转数据

```java
class MyQueue {

    private Stack<Integer> stack;

    private Stack<Integer> reverseStack; 

    public MyQueue() {
        stack = new Stack();
        reverseStack = new Stack();
    }
    
    public void push(int x) {
        stack.push(x);
    }
    
    public int pop() {
        // 反转到另一个栈
        while (!stack.empty()) {
            reverseStack.push(stack.pop());
        }
        // pop 出末尾的数
        int res = reverseStack.pop();
        // 剩余的数回到原来的栈
        while (!reverseStack.empty()) {
            stack.push(reverseStack.pop());
        }
        return res;
    }
    
    public int peek() {
        // 反转到另一个栈
        while (!stack.empty()) {
            reverseStack.push(stack.pop());
        }
        // pop 出末尾的数
        int res = reverseStack.peek();
        // 剩余的数回到原来的栈
        while (!reverseStack.empty()) {
            stack.push(reverseStack.pop());
        }
        return res;
    }
    
    public boolean empty() {
        return stack.empty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```

**改进**：输入栈和输出栈 pop时，只有当输出栈中没有数据时再从输出栈中读取数据

```java
class MyQueue {

    private Stack<Integer> stack;

    private Stack<Integer> reverseStack; 

    public MyQueue() {
        stack = new Stack();
        reverseStack = new Stack();
    }
    
    public void push(int x) {
        stack.push(x);
    }
    
    public int pop() {
        if (reverseStack.empty()) {
            // 反转到另一个栈
            while (!stack.empty()) {
                reverseStack.push(stack.pop());
            }
        }
        // pop 出末尾的数
        return reverseStack.pop();
    }
    
    public int peek() {
        // 复用一下pop()
        int res = this.pop();
        // 再添加回去
        reverseStack.push(res);

        return res;
    }
    
    public boolean empty() {
        // 两个栈都空时为empty
        return stack.empty() && reverseStack.empty();
    }
}
```

### 225 用队列实现栈

使用队列实现栈的下列操作：

- push(x) -- 元素 x 入栈
- pop() -- 移除栈顶元素
- top() -- 获取栈顶元素
- empty() -- 返回栈是否为空

**队列的操作方法：offer(), poll(), peek(), size(), isEmpty()**

#### 方法1：双队列实现

先存在辅助队列中 在把原队列中的数poll到辅助队列中，这样辅助队列中的数就模拟了栈中的出栈顺序

```java
class MyStack {

    Queue<Integer> queue1; // 和栈中保持一样元素的队列
    Queue<Integer> queue2; // 辅助队列

    /** Initialize your data structure here. */
    public MyStack() {
        queue1 = new LinkedList<>();
        queue2 = new LinkedList<>();
    }
    
    /** Push element x onto stack. */
    public void push(int x) {
        queue2.offer(x); // 先放在辅助队列中
        while (!queue1.isEmpty()){
            queue2.offer(queue1.poll());
        }
        Queue<Integer> queueTemp;
        queueTemp = queue1;
        queue1 = queue2;
        queue2 = queueTemp; // 最后交换queue1和queue2，将元素都放到queue1中
    }
    
    /** Removes the element on top of the stack and returns that element. */
    public int pop() {
        return queue1.poll(); // 因为queue1中的元素和栈中的保持一致，所以这个和下面两个的操作只看queue1即可
    }
    
    /** Get the top element. */
    public int top() {
        return queue1.peek();
    }
    
    /** Returns whether the stack is empty. */
    public boolean empty() {
        return queue1.isEmpty();
    }
}
```

#### 方法2：单队列实现

**一个队列在模拟栈弹出元素的时候只要将队列头部的元素（除了最后一个元素外） 重新添加到队列尾部，此时再去弹出元素就是栈的顺序了**

```java
class MyStack {

    Queue<Integer> queue; 

    /** Initialize your data structure here. */
    public MyStack() {
        queue = new LinkedList<>();
    }
    
    /** Push element x onto stack. */
    public void push(int x) {
        // 每offer一个数进来都重新排序
        queue.offer(x);
        int size = queue.size();
        while (size-- > 1) {
            queue.offer(queue.poll());
        }
    }
    
    /** Removes the element on top of the stack and returns that element. */
    public int pop() {
        return queue.poll();
    }
    
    /** Get the top element. */
    public int top() {
        return queue.peek();
    }
    
    /** Returns whether the stack is empty. */
    public boolean empty() {
        return queue.isEmpty();
    }
}
```

## 5 二叉树

### 二叉树的遍历

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

    private List<Integer> res = new ArrayList();
    
    public List<Integer> traversal(TreeNode root) {
        if (root != null) {
            preorderTraversal(root);
        }
        return res;
    }

    // 前序遍历
    private void preorderTraversal(TreeNode node) {
        res.add(node.val);
        if (node.left != null) {
            preorderTraversal(node.left);
        }
        if (node.right != null) {
            preorderTraversal(node.right);
        }
    }
    // 中序遍历
    private void inorderTraversal(TreeNode node) {  
        if (node.left != null) {
            inorderTraversal(node.left);
        }
        res.add(node.val);
        if (node.right != null) {
            inorderTraversal(node.right);
        }
    }
    // 后序遍历
    private void postorderTraversal(TreeNode node) {  
        if (node.left != null) {
            postorderTraversal(node.left);
        }
        res.add(node.val);
        if (node.right != null) {
            postorderTraversal(node.right);
        }
    }
}
```

### 二叉树迭代遍历（栈）

前序遍历是中左右，每次先处理的是中间节点，那么先将根节点放入栈中，然后将右孩子加入栈，再加入左孩子。

为什么要先加入 右孩子，再加入左孩子呢？ 因为这样出栈的时候才是中左右的顺序。

![二叉树前序遍历（迭代法）](https://code-thinking.cdn.bcebos.com/gifs/%E4%BA%8C%E5%8F%89%E6%A0%91%E5%89%8D%E5%BA%8F%E9%81%8D%E5%8E%86%EF%BC%88%E8%BF%AD%E4%BB%A3%E6%B3%95%EF%BC%89.gif)

### 二叉树层序遍历（队列）

给你二叉树的根节点 `root` ，返回其节点值的 **层序遍历** 。 （即逐层地，从左到右访问所有节点）。

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

    public List<List<Integer>> levelOrder(TreeNode root) {
        // 存储最终结果
        List<List<Integer>> res = new ArrayList();
        // 队列存储node节点
        Queue<TreeNode> queue= new LinkedList<>();
        // 遍历指针指向根节点
        TreeNode cur = root;
        // 临时节点
        TreeNode temp;
        // 当前队列的大小，每一次的重新赋值获得的都是一层的大小
        int size = 0;
        // 先把头节点加入队列
        if (cur != null) {
            queue.offer(cur);
        }
        // 从第一层开始遍历
        // size 表示本层元素的大小
        while (!queue.isEmpty()) {
            size = queue.size();
            // 存储当前层的节点值
            List<Integer> list = new ArrayList();
            // size遍历完即一层的节点已经遍历完，此时的队列中已经包含下一层的节点
            while (size-- > 0) {
                // 取出节点
                temp = queue.poll();
                list.add(temp.val);
                // 把节点的左右都存入队列
                if (temp.left != null) {
                    queue.offer(temp.left);
                }
                if (temp.right != null) {
                    queue.offer(temp.right);
                }
            }
            // 一层遍历完，存入结果列表
            res.add(list);
        }
        return res;
    }
}
```

### 226 反转二叉树

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
示例 2：

![img](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

输入：root = [2,1,3]
输出：[2,3,1]
示例 3：

输入：root = []
输出：[]

**方法：**就是遍历二叉树 然后把节点的左右子节点对调

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root != null) {
            preorderTraversal(root);
        }
        return root;
    }

    // 前序遍历
    private void preorderTraversal(TreeNode node) {
        // 操作(把节点的左子节点和右子节点对调)
        // 左右子节点都不存在则不操作
        if (node.left == null && node.right == null) {
            return;
        } else {
            TreeNode temp;
            temp = node.left;
            node.left = node.right;
            node.right = temp;
        }
        // 遍历
        if (node.left != null) {
            preorderTraversal(node.left);
        }
        if (node.right != null) {
            preorderTraversal(node.right);
        }

    }
}
```

### 101 对称二叉树

给你一个二叉树的根节点 `root` ， 检查它是否轴对称。

示例 1：![img](https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg)

输入：root = [1,2,2,3,4,4,3]
输出：true
示例 2：![img](https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg)


输入：root = [1,2,2,null,3,null,3]
输出：false

**方法：**左子树和右子树分别从左和右前序遍历

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

    public boolean isSymmetric(TreeNode root) {
        if (root != null) {
            return preorderTraversal(root.left, root.right);
        }
        return true;
    }

    // 前序遍历
    private boolean preorderTraversal(TreeNode left, TreeNode right) {
        if (left == null && right != null) {
            return false;
        } else if (left != null && right == null) {
            return false;
        } else if (left == null && right == null) {
            return true;
        } else if (left.val != right.val) {
            return false;
        }
        // 遍历
        boolean outside =  preorderTraversal(left.left, right.right);
        boolean inside =  preorderTraversal(left.right, right.left);
        return inside && outside;
    }
}
```

### 104 二叉树的最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    	3
       / \
      9  20
        /  \
       15   7
    返回它的最大深度 3 。
**方法1：**使用深度优先遍历

```java
class Solution {
    public int maxDepth(TreeNode root) {
        return getDepth(root);
    }

    int getDepth(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int leftDepth = getDepth(node.left);
        int rightDepth = getDepth(node.right);
        int depth = 1 + (leftDepth > rightDepth ? leftDepth : rightDepth);
        return depth;
    }
}
```

**方法2：**层序遍历 层数即深度

```java
class Solution {

    public List<List<Integer>> levelOrder(TreeNode root) {
        // 队列存储node节点
        Queue<TreeNode> queue= new LinkedList<>();
        // 遍历指针指向根节点
        TreeNode cur = root;
        // 临时节点
        TreeNode temp;
        // 当前队列的大小，每一次的重新赋值获得的都是一层的大小
        int size = 0;
        // 深度
        int depth = 0;
        // 先把头节点加入队列
        if (cur != null) {
            queue.offer(cur);
        }
        // 从第一层开始遍历
        // size 表示本层元素的大小
        while (!queue.isEmpty()) {
            size = queue.size();
            // 存储当前层的节点值
            List<Integer> list = new ArrayList();
            // size遍历完即一层的节点已经遍历完，此时的队列中已经包含下一层的节点
            while (size-- > 0) {
                // 取出节点
                temp = queue.poll();
                list.add(temp.val);
                // 把节点的左右都存入队列
                if (temp.left != null) {
                    queue.offer(temp.left);
                }
                if (temp.right != null) {
                    queue.offer(temp.right);
                }
            }
            // 一层遍历完，深度+1
            depth++;
        }
        return depth;
    }
}
```

## 技巧 差分数组

假设你有⼀个⻓度为 n 的数组，初始情况下所有的数字均为 0，你将会被给出 k 个更新的操作。 其中，每个操作会被表示为⼀个三元组：[startIndex, endIndex, inc]，你需要将⼦数组 A[startIndex ... endIndex]（包括 startIndex 和 endIndex）增加 inc。 请你返回 k 次操作后的数组。
**注意：数组的索引可能跟题目给的序号不一致 要减一**

### 1094 拼车

车上最初有 capacity 个空座位。车 只能 向一个方向行驶（也就是说，不允许掉头或改变方向）

给定整数 capacity 和一个数组 trips ,  trip[i] = [numPassengersi, fromi, toi] 表示第 i 次旅行有 numPassengersi 乘客，接他们和放他们的位置分别是 fromi 和 toi 。这些位置是从汽车的初始位置向东的公里数。

当且仅当你可以在所有给定的行程中接送所有乘客时，返回 true，否则请返回 false。

示例 1：

输入：trips = [[2,1,5],[3,3,7]], capacity = 4
输出：false

**方法：**差分数组法 把问题等效于每个时间段的总乘客数相加（这样就把问题转换为了数组操作） 而后判断是否有某个时间段的人数超过座位数

```java
class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        // 最多有1000个车站
        int[] nums = new int[1001];
        // 构造差分解法
        Difference df = new Difference(nums);

        for (int[] trip : trips) {
            // 乘客数量
            int val = trip[0];
            // 第 trip[1] 站上车
            int i = trip[1];
            // 第 trip[2] 站下车
            int j = trip[2] - 1;    // 呆在车上的区间为[trip[1], trip[2] - 1]
            // 区间化操作
            df.increment(i, j, val);
        }

        int[] res = df.result();

        // 判断是否超载
        for (int i = 0; i < res.length; i++) {
            if (capacity < res[i]) {
                return false;
            }
        }
        return true;
    }

    // 差分数组⼯具类
    class Difference {
        // 差分数组
        private int[] diff;

        /* 输⼊⼀个初始数组，区间操作将在这个数组上进⾏ */
        public Difference(int[] nums) {
            assert nums.length > 0;
            diff = new int[nums.length];
            // 根据初始数组构造差分数组
            diff[0] = nums[0];
            for (int i = 1; i < nums.length; i++) {
                diff[i] = nums[i] - nums[i - 1];
            }
        }

        /* 给闭区间 [i,j] 增加 val（可以是负数）*/
        public void increment(int i, int j, int val) {
            diff[i] += val;
            if (j + 1 < diff.length) {
                diff[j + 1] -= val;
            }
        }

        /* 返回结果数组 */
        public int[] result() {
            int[] res = new int[diff.length];
            // 根据差分数组构造结果数组
            res[0] = diff[0];
            for (int i = 1; i < diff.length; i++) {
                res[i] = res[i - 1] + diff[i];
            }
            return res;
        }
    }

    public static void main(String[] args) {
        
    }
}
```

### 1109 航班预定统计

这里有 n 个航班，它们分别从 1 到 n 进行编号。

有一份航班预订表 bookings ，表中第 i 条预订记录 bookings[i] = [firsti, lasti, seatsi] 意味着在从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。

请你返回一个长度为 n 的数组 answer，里面的元素是每个航班预定的座位总数。

示例 1：

输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
输出：[10,55,45,25,25]
解释：
航班编号        1   2   3   4   5
预订记录 1 ：   10  10
预订记录 2 ：       20  20
预订记录 3 ：       25  25  25  25
总座位数：      10  55  45  25  25
因此，answer = [10,55,45,25,25]

**方法：**完美满足差分数组法 返回计算后的result就行

```java
class Solution {
    public int[] corpFlightBookings(int[][] bookings, int n) {
        // 存结果
        int[] answer = new int[n];
        // 初始化差分数组
        Difference df = new Difference(answer);
        // 计算
        for (int i = 0; i < bookings.length; i++) {
            df.increment(bookings[i][0] - 1, bookings[i][1] - 1, bookings[i][2]);
        }
        return df.result();
    }

    // 差分数组⼯具类
    class Difference {
        // 差分数组
        private int[] diff;

        /* 输⼊⼀个初始数组，区间操作将在这个数组上进⾏ */
        public Difference(int[] nums) {
            assert nums.length > 0;
            diff = new int[nums.length];
            // 根据初始数组构造差分数组
            diff[0] = nums[0];
            for (int i = 1; i < nums.length; i++) {
                diff[i] = nums[i] - nums[i - 1];
            }
        }

        /* 给闭区间 [i,j] 增加 val（可以是负数）*/
        public void increment(int i, int j, int val) {
            diff[i] += val;
            if (j + 1 < diff.length) {
                diff[j + 1] -= val;
            }
        }

        /* 返回结果数组 */
        public int[] result() {
            int[] res = new int[diff.length];
            // 根据差分数组构造结果数组
            res[0] = diff[0];
            for (int i = 1; i < diff.length; i++) {
                res[i] = res[i - 1] + diff[i];
            }
            return res;
        }
    }
}
```

## 6 回溯算法

### 理论

回溯法，一般可以解决如下几种问题：

- 组合问题：N个数里面按一定规则找出k个数的集合
- 切割问题：一个字符串按一定规则有几种切割方式
- 子集问题：一个N个数的集合里有多少符合条件的子集
- 排列问题：N个数按一定规则全排列，有几种排列方式
- 棋盘问题：N皇后，解数独等等

### 模板

```text
void backtracking(参数) {
    if (终止条件) {
        result.add(路径)
        return
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

### 77 组合问题

给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

你可以按 **任何顺序** 返回答案。

```java
class Solution {

    private List<List<Integer>> result = new ArrayList<>();

    private LinkedList<Integer> path = new LinkedList<>();

    public List<List<Integer>> combine(int n, int k) {
        backTrack(n, k, 1);
        return result;
    }

    // n 表示宽度
    // k 表示递归的深度
    // startIndex来记录下一层递归，搜索的起始位置
    void backTrack(int n, int k, int startIndex) {
        if (path.size() == k) {
            result.add(new ArrayList(path));
            return;
        }
        // 【剪枝优化】 当列表中剩余的元素数小于列表需要的元素数时 说明已经不需要向后递归了
        // k - path.size() 表示剩余需要的元素数
        // n - i + 1 表示表中剩余元素数
        for (int i = startIndex; i <= n - (k - path.size()) + 1; i++) {
            // 做选择
            path.add(i);
            // 递归下一层
            backTrack(n, k, i + 1);
            // 撤销选择
            path.removeLast();
        }
     }
}
```

### 17 电话号码的字母组合

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例 1：

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
示例 2：

输入：digits = ""
输出：[]
示例 3：

输入：digits = "2"
输出：["a","b","c"]

**方法：**回溯算法框架 这题的宽度为两层需要两层for 深度为输入字符串的长度

```java
class Solution {

    String[] ABC = new String[] {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv","wxyz"};

    List<String> res = new ArrayList();

    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) {
            return res;
        }
        backtrack(digits, 0, new StringBuilder());
        return res;
    }

    void backtrack(String digits,int start, StringBuilder sb) {
        // 判断是否到达底部
        if (sb.length() == digits.length()) {
            res.add(sb.toString());
            return;
        }
        //
        for (int i = start; i < digits.length(); i++) {
            int digit = digits.charAt(i) - '0';
            for (char c : ABC[digit].toCharArray()) {
                // 做选择
                sb.append(c);
                // 递归
                backtrack(digits, i + 1, sb);
                // 撤销选择
                sb.deleteCharAt(sb.length() - 1);
            }
        }
    }
}
```

### 46 全排列

给定一个不含重复数字的数组 `nums` ，返回其 *所有可能的全排列* 。你可以 **按任意顺序** 返回答案

**方法：**全排列问题因为有顺序的原因所以for循环遍历都是从0开始 判断path中是否已经有当前数来判断是否已经排列过这个数

```java
class Solution {
    List<List<Integer>> result = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> permute(int[] nums) {
        if (nums.length == 0) return result;
        backtrack(nums);
        return result;
    }
    public void backtrack(int[] nums) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
        }
        for (int i =0; i < nums.length; i++) {
            // 如果path中已有，则跳过
            if (path.contains(nums[i])) {
                continue;
            } 
            path.add(nums[i]);
            backtrack(nums);
            path.removeLast();
        }
    }
}
```

### 78 子集

给你一个整数数组 `nums` ，数组中的元素 **互不相同** 。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按 **任意顺序** 返回解集。

**示例 1：**

```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**方法：**子集问题看成深度在变化的组合问题

多个组合问题 深度在变化 = [0, nums.length]

```java
class Solution {

    List<List<Integer>> res = new ArrayList();

    LinkedList<Integer> path = new LinkedList();

    public List<List<Integer>> subsets(int[] nums) {
        // 多个组合问题 深度在变化 = [0, nums.length]
        for (int i = 0; i <= nums.length; i++) {
            backtrack(nums, i, 0);
        }
        return res;
    }

    void backtrack(int[] nums, int depth, int startIndex) {
        // 终止条件
        if (path.size() == depth) {
            res.add(new ArrayList(path));
            return;
        }
        for (int i = startIndex; i < nums.length - (depth - path.size()) + 1; i++) {
            // 选择
            path.add(nums[i]);
            // 递归
            backtrack(nums, depth, i + 1);
            // 撤销选择
            path.removeLast();
        }
    }
}
```

**方法2：**遍历一颗回溯树，但是不设终止条件 保存全部的路径

```java
class Solution {

    List<List<Integer>> res = new ArrayList();

    LinkedList<Integer> path = new LinkedList();

    public List<List<Integer>> subsets(int[] nums) {
        backtrack(nums, 3, 0);
        return res;
    }

    void backtrack(int[] nums, int depth, int startIndex) {
        res.add(new ArrayList(path));
        for (int i = startIndex; i < nums.length; i++) {
            // 选择
            path.add(nums[i]);
            // 递归
            backtrack(nums, depth, i + 1);
            // 撤销选择
            path.removeLast();
        }
    }
}
```

### 131 分割回文串

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是 **回文串** 。返回 `s` 所有可能的分割方案。

**回文串** 是正着读和反着读都一样的字符串。

**示例 1：**

```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

**方法：**

```java
class Solution {

    List<List<String>> res = new ArrayList();

    LinkedList<String> path = new LinkedList();

    public List<List<String>> partition(String s) {
        if (s == null) {
            return res;
        }
        backtrack(s, 0);
        return res;
    }

    // 深度为字符串长度
    void backtrack(String str, int startIndex) {
        // 终止条件 startIndex 表示截取的记号
        if (startIndex >= str.length()) {
            res.add(new ArrayList(path));
            return;
        }
        for (int i = startIndex; i < str.length(); i++) {
            // 选择
            if (isPalindrome(str, startIndex, i)) {
                String temp = str.substring(startIndex, i + 1);
                path.add(temp);
            } else {
                continue;
            }
            // 递归
            backtrack(str, i + 1);
            path.removeLast();
        }
    }

    // 判断是否为回文字符串
    // 字符串反转与原字符串相等即为回文
    boolean isPalindrome(String str, int start, int end) {
        for (int i = start, j = end; i < j; i++, j--) {
            if (str.charAt(i) != str.charAt(j)) {
                return false;
            }
        }
        return true;
    }
}
```



## 7 动态规划

### 模板

**动态规划问题五步曲**

1. 确定dp数组（dp table）以及下标的含义
2. 确定递推公式
3. dp数组如何初始化
4. 确定遍历顺序
5. 举例推导dp数组

### 509 斐波那契数

斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
给定 n ，请计算 F(n) 。

**方法：**优化dp数组，只保留F(n - 1) + F(n - 2)的值，不需要保存for循环计算的所有值，省空间O(1)

状态转移式如上所示

```java
class Solution {
    public int fib(int n) {
        if (n < 1) {
            return n;
        }
        // 初始化DP
        int[] dpTable = new int[2];
        dpTable[0] = 0;
        dpTable[1] = 1;
        int sum = 0;
        // 状态转移
        if (n > 1) {
            for (int i = 2; i <= n; i++) {
                sum = dpTable[0] + dpTable[1];
                dpTable[0] = dpTable[1];
                dpTable[1] = sum;
            }
        }  
        return dpTable[1];
    }
}
```

### 62 不同路径

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

![img](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

```java
class Solution {
    public int uniquePaths(int m, int n) {
        // dp数组
        int[][] dpTable = new int[m][n];
        int temp1 = 0;
        int temp2 = 0;
        // 按行遍历
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // 边上的格子缺少 会数组越界
                if (i == 0 && j == 0) {
                    temp1 = 0;
                    temp2 = 1;
                } else if (i == 0 && j != 0) {
                    temp1 = 0;
                    temp2 = dpTable[i][j - 1];
                } else if (i != 0 && j == 0) {
                    temp1 = dpTable[i - 1][j];
                    temp2 = 0;
                } else {
                    temp1 = dpTable[i][j - 1];
                    temp2 = dpTable[i - 1][j];
                }
                dpTable[i][j] = temp1 + temp2;
            }
        }
        return dpTable[m - 1][n - 1];
    }
}
```

### 63 不同路径2

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 1 和 0 来表示。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg)


输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右

**方法：**动态规划二维DP问题

```java
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;    // 行数
        int n = obstacleGrid[0].length; // 列数
        // dp数组 数组中每个数代表从起点到对应位置的路径数
        int[][] dpTable = new int[m][n];
        // 如果在起点和终点遇到了障碍 直接返回0
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) {
            return 0;
        }
        // 本题特点 因为是从左上往右下移动，所以最左一列和最上一行的dp数组值都为1
        for (int i = 0; i < m; i++) {
            // 当出现了一个障碍时 后面的都到达不了 直接结束赋值
            if (obstacleGrid[i][0] == 1) {
                break;
            }
            dpTable[i][0] = 1;
        }
        for (int i = 1; i < n; i++) {
            if (obstacleGrid[0][i] == 1) {
                break;
            }
            dpTable[0][i] = 1;
        }
        // 按行遍历 从[1, 1]开始
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                // 障碍物处理
                if (obstacleGrid[i][j] == 1) {
                    dpTable[i][j] = 0;
                } else {
                    dpTable[i][j] = dpTable[i - 1][j] + dpTable[i][j - 1];
                }
            }
        }
        return dpTable[m - 1][n - 1];
    }
}
```

### 198 打家劫舍

如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：

输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

**方法：**这是一道一维动态规划题 主要需要确定dp数组的含义 以及递推公式

```java
class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1)  {
            return nums[0];
        }
        // 递推公式
        // 每次偷当前人家 偷或不偷对应两种情况 da取最大值
        // max(dp[i - 2] + nums[i], dp[i - 1])
        // 初始化dp数组
        // 优化空间 dp数组只用2格空间 只记录与当前计算相关的前两个结果
        int[] dpTable = new int[2];
        dpTable[0] = nums[0];
        dpTable[1] = nums[0] > nums[1] ? nums[0] : nums[1];
        int res = 0;
        // 遍历
        for (int i = 2; i < nums.length; i++) {
            res = (dpTable[0] + nums[i]) > dpTable[1] ? (dpTable[0] + nums[i]) : dpTable[1];
            dpTable[0] = dpTable[1];
            dpTable[1] = res;
        }
        // 输出结果
        return dpTable[1];
    }
}
```

### 213 打家劫舍2

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈** ，这意味着**第一个房屋和最后一个房屋是紧挨着的**。同时，**相邻的房屋装有相互连通的防盗系统**，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

示例 1：

输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

**方法：**打家劫舍1的区别是首尾是相连的 状态转移方程有变化 初始状态也有变化

我们把首尾被抢的情况分为3种

1. 首尾都不抢 此时等效于对[1, n-2]的房屋进行打家劫舍1问题
2. 首抢尾不抢 此时等效于对[0, n-2]的房屋进行打家劫舍1问题
3. 首不抢尾抢 此时等效于对[1, n-1]的房屋进行打家劫舍1问题

```java
class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1)  {
            return nums[0];
        }
        // 分成3次基本打家劫舍问题 又由于后两次的范围对于第一次是包含关系 所以可以不考虑第一次
        int result1 = rob1(nums, 0, nums.length - 2);
        int result2 = rob1(nums, 1, nums.length - 1);
        return result1 > result2 ? result1 : result2;
    }

    // 基本打家劫舍问题算法
    int rob1(int[] nums, int start, int end) {
        if (end - start < 0)  {
            return 0;
        } else if (end - start == 0) {
            return nums[start];
        }
        int[] dpTable = new int[2];
        dpTable[0] = nums[start];
        dpTable[1] = nums[start] > nums[start + 1] ? nums[start] : nums[start + 1];
        int res = 0;
        // 遍历
        for (int i = start + 2; i <= end; i++) {
            res = (dpTable[0] + nums[i]) > dpTable[1] ? (dpTable[0] + nums[i]) : dpTable[1];
            dpTable[0] = dpTable[1];
            dpTable[1] = res;
        }
        // 输出结果
        return dpTable[1];
    }
}
```

