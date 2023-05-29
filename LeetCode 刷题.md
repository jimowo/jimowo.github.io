# LeetCode 刷题

<u>参考[代码随想录学习](https://programmercarl.com/)</u>

## 1 数组

### 704 二分查找（左右指针法）

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

### 27 移除元素（前后指针法）

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

### 42 接雨水（动态规划 前后指针）

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

**方法1**：暴力解法

```java
water[i] = min(
               # 左边最高的柱子
               max(height[0..i]),  
               # 右边最高的柱子
               max(height[i..end]) 
            ) - height[i]
```

```java
class Solution {

    public int trap(int[] height) {
        // 先找极小值
        // 再向极小值的两边找极大值
        // 用最小的极大值减去中间区域的值 相加 得到该区域接的雨水
        int n = height.length;
        int res = 0;
        for (int i = 1; i < n - 1; i++) {
            int l_max = 0, r_max = 0;
            // 找右边最高的柱子
            for (int j = i; j < n; j++)
                r_max = Math.max(r_max, height[j]);
            // 找左边最高的柱子
            for (int j = i; j >= 0; j--)
                l_max = Math.max(l_max, height[j]);
            // 如果自己就是最高的话，
            // l_max == r_max == height[i]
            res += Math.min(l_max, r_max) - height[i];
        }
        return res;
    }
}
```

**方法2**：备忘录 先提前计算好每个位置的左右最大柱子高度 避免计算雨水时的重复计算

```java
class Solution {

    // 备忘录优化
    public int trap(int[] height) {
        if (height.length == 0) {
            return 0;
        }
        int n = height.length;
        int res = 0;
        // 数组充当备忘录
        int[] l_max = new int[n];
        int[] r_max = new int[n];
        // 初始化 base case
        l_max[0] = height[0];
        r_max[n - 1] = height[n - 1];
        // 从左向右计算 l_max
        for (int i = 1; i < n; i++)
            l_max[i] = Math.max(height[i], l_max[i - 1]);
        // 从右向左计算 r_max
        for (int i = n - 2; i >= 0; i--)
            r_max[i] = Math.max(height[i], r_max[i + 1]);
        // 计算答案
        for (int i = 1; i < n - 1; i++)
            res += Math.min(l_max[i], r_max[i]) - height[i];
        return res;
    }
}
```

**方法3**：继续优化dp数组的空间 很明显可以优化到1

```java
class Solution {
    public int trap(int[] height) {
        if (height.length == 0) {
            return 0;
        }
        // 动态规划 双dp数组 分别记录每个i对应位置的左边最大值和右边最大值
        // 1. 初始化dp数组(dp数组空间优化 仅记录左最大和右最大)
        int l_max = 0;
        int r_max = 0;

        int left = 0, right = height.length - 1;
        int res = 0;
        while (left < right) {
            // 更新dp
            l_max = Math.max(l_max, height[left]);
            r_max = Math.max(r_max, height[right]);
            // 计算结果
            // res += min(l_max, r_max) - height[i]
            if (l_max < r_max) {
                res += l_max - height[left];
                left++;
            } else {
                res += r_max - height[right];
                right--;
            }
        }
        return res;
    }
}
```

### 11 盛水最多的容器

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**示例 1：**

![img](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

**方法1**：暴力 遍历所有情况

```java
class Solution {
    public int maxArea(int[] height) {
        if (height.length == 0) {
            return 0;
        }
        int n = height.length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
            }
        }

        return res;
    }
}
```

**方法2**：左右指针 只向内移动短板 容量只会不变或者上升

```java
class Solution {

    public int maxArea(int[] height) {
        if (height.length == 0) {
            return 0;
        }
        int n = height.length;
        int res = 0;

        // 左右指针
        // 移动短板
        int left = 0, right = n - 1;
        while (left < right) {

            res = Math.max(res, Math.min(height[left], height[right]) * (right - left));

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return res;
    }
}
```



### 1 两数之和

这题要返回下标 所以先排序再左右指针的方法不适用

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // 优化时间
        // 遍历一遍过程中记录后面是否有满足与前面和=target的数
        Map<Integer, Integer> need = new HashMap();
        for (int left = 0; left < nums.length; left++) {
            if (need.containsKey(target - nums[left])) {
                return new int[] { need.get(target - nums[left]), left };
            }
            need.put(nums[left], left);
        }
        return null;
    }
}
```

### 18 四数之和(排序后的左右指针)

给出一个求N数之和的框架

```java
class Solution {

    /**
     * @apiNote N个数的和问题通用解法 使用递归分解问题
     * @param nums 数组
     * @param n 计算n个数和
     * @param start 开始位置
     * @param target 目标和 使用long类型以防超出int类型范围
     * @return 返回满足情况的所有解
     */
    List<List<Integer>> backtrackNSum(int[] nums, int n, int start, long target) {

        List<List<Integer>> res = new ArrayList<>();

        if (n < 2 || nums.length < n) {
            return res;
        }
        if (n == 2) {
            // 两数之和
            int lo = start, hi = nums.length - 1;
            while (lo < hi) {
                int sum = nums[lo] + nums[hi];
                int left = nums[lo], right = nums[hi];
                if (sum < target) {
                    // 跳过相同的数
                    while (lo < hi && nums[lo] == left) lo++;
                } else if (sum > target) {
                    while (lo < hi && nums[hi] == right) hi--;
                } else {
                    res.add(new ArrayList<>(Arrays.asList(left, right)));
                    // 跳过所有重复的元素
                    while (lo < hi && nums[lo] == left) lo++;
                    while (lo < hi && nums[hi] == right) hi--;
                }
            }
        } else {
            // 超过两数之和 递归计算
            for (int i = start;i < nums.length; i++) {
                List<List<Integer>> sub = backtrackNSum(nums, n - 1, i + 1, (long)(target - nums[i]));
                for (List<Integer> list : sub) {
                    list.add(nums[i]);
                    res.add(list);
                }
                // 跳过重复数
                while (i < nums.length - 1 && nums[i] == nums[i + 1]) i++;
            }
        }
        return res;
    }
}
```



### 977 有序数组的平方

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

### 209 长度最小的子数组（滑动窗口法）

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

1. 初始化`Left = right = 0`，把索引左闭右开`[left, right]`称为一个窗口
2. 我们先不断增加`right`指针扩大窗口，直到窗口中的值符合要求
3. 此时，停止增加`right`，不断增加`left`指针缩小窗口范围，直到窗口不再满足

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
                // 输出处理
                width = right - left + 1;
                res = res < width ? res : width;
                // 左边界右移
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

### 203 移除链表元素（虚拟头指针dummy）

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

### 142 环形链表（快慢指针）

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

### 3 无重复字符的最长子串（滑动窗口）

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例 1:**

```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**方法**：滑动窗口法 s由英文字母、数字、符号和空格组成 所以用一个128位的数组来记录s中每个字符的出现次数

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {

        int[] abc = new int[128]; // 记录128个字符出现的个数
        int res = 0;
        for (int left = 0, right = 0; right < s.length(); right++) {
            abc[s.charAt(right) - ' ']++;
            // 左移窗口
            while (abc[s.charAt(right) - ' '] > 1) {
                abc[s.charAt(left) - ' '] -= 1;
                left++; 
            };  
            // 记录当前的最大长度
            res = Math.max(res, right - left + 1);
        }
        return res;
    }
}
```



### 76 最小覆盖子串（滑动窗口）

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。


示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

**方法**：滑动窗口法 这里需要使用`Map`来当作窗口

```java
public class Solution {
    public static String minWindow(String s, String t) {
        // t比s长的情况
        if (t.length() > s.length()) {
            return "";
        }
        // 初始化
        Map<Character, Integer> need = new HashMap();   // 用来判断是否已经出现过该字符
        Map<Character, Integer> window = new HashMap();
        int valid = 0;
        for (int i = 0; i < t.length(); i++) {
            add(need, t.charAt(i));
        }
        int head = 0;   // 记录最短覆盖串的起始位置
        int minLen = Integer.MAX_VALUE; // 记录最短的覆盖串长度
        // 滑动窗口
        for (int right = 0, left = 0; right < s.length(); right++) {
            // 扩大窗口
            if (need.containsKey(s.charAt(right))) {
                add(window, s.charAt(right));
                if (window.get(s.charAt(right)) == need.get(s.charAt(right))) {
                    valid++;
                }
            }
            // 判断是否收缩窗口
            while (valid == need.size()) {
                // 是否更新数据
                if (right - left + 1 < minLen) {
                    head = left;
                    minLen = right - left + 1;
                }
                // 移出窗口 收缩
                if (need.containsKey(s.charAt(left))) {
                    if (window.get(s.charAt(left)) == need.get(s.charAt(left))) {
                        // 一个字符不满足个数
                        valid--;
                    }
                }
                minus(window, s.charAt(left));
                left++;
            }
        }
        // 输出
        return minLen == Integer.MAX_VALUE ? "" : s.substring(head, head + minLen);
    }

    static void add(Map<Character, Integer> map, char key) {
        if (!map.containsKey(key)) {
            map.put(key, 1);
        } else {
            map.put(key, map.get(key) + 1);
        }
    }

    static void minus(Map<Character, Integer> map, char key) {
        if (map.containsKey(key)) {
            map.put(key, map.get(key) - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(minWindow("ADOBECODEBANC", "ABC"));
    }

}
```

### 438 找到字符串中所有字母异位词

给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的 **异位词** 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

**异位词** 指由相同字母重排列形成的字符串（包括相同的字符串）。

示例 1:

输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

```java
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        // 用于返回字母异位词的起始索引
        List<Integer> res = new ArrayList<>();
        // 用 map 存储目标值中各个单词出现的次数
        HashMap<Character, Integer> map = new HashMap<>();
        for (Character c : p.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);
        // 用另外一个 map 存储滑动窗口中有效字符出现的次数
        HashMap<Character, Integer> window = new HashMap<>();
        int left = 0; // 左指针
        int right = 0; // 右指针
        int valid = p.length(); // 只有当 valid == 0 时，才说明 window 中包含了目标子串
        while (right < s.length()) {
            // 如果目标子串中包含了该字符，才存入 window 中
            if (map.containsKey(s.charAt(right))) {
                window.put(s.charAt(right), window.getOrDefault(s.charAt(right), 0) + 1);
                // 只有当 window 中该有效字符数量不大于map中该字符数量，才能算一次有效包含
                if (window.get(s.charAt(right)) <= map.get(s.charAt(right))) {
                    valid--;
                }
            }
            // 如果 window 符合要求，即两个 map 存储的有效字符相同，就可以移动左指针了
            // 但是只有二个map存储的数据完全相同，才可以记录当前的起始索引，也就是left指针所在位置
            while (valid == 0) {
                if (right - left + 1 == p.length()) res.add(left);
                // 如果左指针指的是有效字符,需要更改 window 中的 key 对应的 value
                // 如果 有效字符对应的数量比目标子串少，说明无法匹配了
                if (map.containsKey(s.charAt(left))) {
                    window.put(s.charAt(left), window.get(s.charAt(left)) - 1);
                    if (window.get(s.charAt(left)) < map.get(s.charAt(left))) {
                        valid++;
                    }
                }
                left++;
            }
            right++;
        }
        return res;
    }
}
```

### 5 最长回文子串

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

**示例 1：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

**方法**：动态规划

$P(i,i)=true$

$P(i,i+1)=(Si==Si+1)$

```java
public class Solution {

    public String longestPalindrome(String s) {
        int len = s.length();
        // 排除长度为1的情况
        if (len < 2) {
            return s;
        }

        int maxLen = 1;
        int begin = 0;
        // dp[i][j] 表示 s[i..j] 是否是回文串
        boolean[][] dp = new boolean[len][len];
        // 初始化：所有长度为 1 的子串都是回文串
        for (int i = 0; i < len; i++) {
            dp[i][i] = true;
        }

        char[] charArray = s.toCharArray();
        // 递推开始
        // 先枚举子串长度
        for (int L = 2; L <= len; L++) {
            // 枚举左边界，左边界的上限设置可以宽松一些
            for (int i = 0; i < len; i++) {
                // 由 L 和 i 可以确定右边界，即 j - i + 1 = L 得
                int j = L + i - 1;
                // 如果右边界越界，就可以退出当前循环
                if (j >= len) {
                    break;
                }

                if (charArray[i] != charArray[j]) {
                    dp[i][j] = false;
                } else {
                    if (j - i < 3) {
                        dp[i][j] = true;
                    } else {
                        dp[i][j] = dp[i + 1][j - 1];
                    }
                }

                // 只要 dp[i][L] == true 成立，就表示子串 s[i..L] 是回文，此时记录回文长度和起始位置
                if (dp[i][j] && j - i + 1 > maxLen) {
                    maxLen = j - i + 1;
                    begin = i;
                }
            }
        }
        return s.substring(begin, begin + maxLen);
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

  那么把求得的最长相同前后缀的长度就是对应前缀表的元素，如图：

   ![KMP精讲8](https://code-thinking.cdn.bcebos.com/pics/KMP%E7%B2%BE%E8%AE%B28.png)
  
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

### 20 有效的括号

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

```
输入：s = "()"
输出：true
```

**示例 2：**

```
输入：s = "()[]{}"
输出：true
```

**方法**：遇到左括号就⼊栈，遇到右括号就去栈中寻找最近的左括号，看是否匹配

```java
class Solution {
    public boolean isValid(String s) {
        // 括号不是成双成对出现 肯定错的
        if (s.length() % 2 != 0) {
            return false;
        }
        Set<Character> left = new HashSet<>();
        left.add('(');
        left.add('{');
        left.add('[');
        Stack<Character> flags = new Stack<>();	// 存储左括号
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (left.contains(c)) {
                // 入栈
                flags.push(c);
            } else {
                // 排除掉括号闭合顺序错误的情况
                if (flags.isEmpty()) {
                    return false;
                }
                // 判断左括号是否与相同类型的右括号闭合
                char lc = flags.pop();
                if ((c == ')' && lc != '(') ||
                        (c == '}' && lc != '{') ||
                        (c == ']' && lc != '[')) {
                    return false;
                }
            }
        }
        // 排除掉缺少与左括号对应的右括号的情况
        if (!flags.isEmpty()) {
            return false;
        }
        return true;
    }
}
```

### 921 使括号有效的最少添加

只有满足下面几点之一，括号字符串才是有效的：

- 它是一个空字符串，或者
- 它可以被写成 `AB` （`A` 与 `B` 连接）, 其中 `A` 和 `B` 都是有效字符串，或者
- 它可以被写作 `(A)`，其中 `A` 是有效字符串。

给定一个括号字符串 `s` ，在每一次操作中，你都可以在字符串的任何位置插入一个括号

- 例如，如果 `s = "()))"` ，你可以插入一个开始括号为 `"(()))"` 或结束括号为 `"())))"` 。

返回 *为使结果字符串 `s` 有效而必须添加的最少括号数*。

**示例 1：**

```
输入：s = "())"
输出：1
```

**示例 2：**

```
输入：s = "((("
输出：3
```

**方法**：// 遍历完后need中存储需要的右括号数量
        // res中存储需要的左括号数量

```java
class Solution {
    public int minAddToMakeValid(String s) {
        int need = 0;
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                need++; // 需要一个右括号
            } else {
                need--; // 消耗一个左括号
                if (need == -1) {
                    // 说明前面缺少对应的左括号 需要补一个左括号
                    res++;
                    need = 0;
                }
            }
        }
        // 遍历完后need中存储需要的右括号数量
        // res中存储需要的左括号数量
        return res + need;
    }
}
```

### 239 滑动窗口的最大值（单调队列）

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回 *滑动窗口中的最大值* 。

**示例 1**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**方法**：需要判断窗口中的数的大小，使用单调队列作为窗口

```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        MonotonicQueue window = new MonotonicQueue();
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            // 先填满窗口
            if (i < k - 1) {
                window.push(nums[i]);
            } else {
                window.push(nums[i]);
                // 记录当前窗口最大值
                res.add(window.max());
                // 缩小窗口
                window.pop(nums[i - k + 1]);
            }
        }
        
        int[] arr = new int[res.size()];
        for (int i = 0; i < res.size(); i++) {
            arr[i] = res.get(i);
        }
        return arr;
    }
}

// 单调队列
class MonotonicQueue {
    LinkedList<Integer> q = new LinkedList<>();

    public void push(int n) {
        // 将队列中小于n的元素全部删除
        while (!q.isEmpty() && q.getLast() < n) {
            q.pollLast();
        }
        // 将n加入尾部
        q.addLast(n);
    }

    public int max() {
        return q.getFirst();
    }

    // 删除窗口左侧元素时 如果他在队列中 就把他删除
    // 如果不在队列中 说明它在push()中就已经被删除
    public void pop(int n) {
        if (n == q.getFirst()) {
            q.pollFirst();
        }
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

### 494 目标和

给你一个整数数组 `nums` 和一个整数 `target` 。

向数组中的每个整数前添加 `'+'` 或 `'-'` ，然后串联起所有整数，可以构造一个 **表达式** ：

- 例如，`nums = [2, 1]` ，可以在 `2` 之前添加 `'+'` ，在 `1` 之前添加 `'-'` ，然后串联起来得到表达式 `"+2-1"` 。

返回可以通过上述方法构造的、运算结果等于 `target` 的不同 **表达式** 的数目。

**示例 1：**

输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

**方法**：回溯树中每次可选择`+nums[i]`或者`-nums[i]`，画出回溯树

```java
class Solution {
    private int res = 0; // 记录和满足目标的表达式个数

    public int findTargetSumWays(int[] nums, int target) {
        backtrack(nums, target, 0);
        return res;
    }

    private void backtrack(int[] nums, int target, int start) {
        // 终止条件
        if (start == nums.length) {
            // 判断是否和为target
            if (target == 0) {
                res++;
            }
            return;
        }
        
        // 回溯
        // +
        backtrack(nums, target - nums[start], start+1);

        // -
        backtrack(nums, target + nums[start], start+1);

    }
}
```

**剪枝优化**

利用备忘录当在同一位置，且剩余的值相同时，直接返回备忘录中的值

**方法2**：使用动态规划

```java
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        // 排除 nums 中所有数的和都小于target的情况
        if (Arrays.stream(nums).sum() < target || - Arrays.stream(nums).sum() > target) {
            return 0;
        }
        // 转换为0-1背包问题
        // 如果我们把 nums 划分成两个子集 A 和 B，分别代表分配 + 的数和分配 - 的数，那么他们和 target 存在如下关系
        // 可以推出 sum(A) = (target + sum(nums)) / 2，也就是把原问题转化成：nums 中存在几个子集 A，使得 A 中元素的和为 (target + sum(nums)) / 2
        if ((target + Arrays.stream(nums).sum()) % 2 != 0) {
            return 0;
        }
        int sum = (target + Arrays.stream(nums).sum()) / 2;
        // 初始化DP数组
        // 优化一维dp 因为新的一行只与上一行的数相关 所以计算过程中保留一行的计算结果就行
        int[] dp = new int[sum + 1];
        dp[0] = 1;
        // 状态转移
        for (int i = 0; i < nums.length; i++) {
            for (int j = sum; j >= nums[i]; j--) {    // 优化一维dp必须倒着更新行 因为顺序更新 会直接影响这一行之后的结果
                dp[j] = dp[j] + dp[j - nums[i]];    // 优化一维dp
            }
        }
        return dp[sum];
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

### 698 划分相等子集（分割等和子集问题通用解法）

给定⼀个整数数组 nums 和⼀个正整数 k，找出是否有可能把这个数组分成 k 个⾮空⼦集，其总和都相等。 

示例 1： 

输⼊：nums = [4, 3, 2, 3, 5, 2, 1], k = 4 

输出：True 说明：有可能将其分成 4 个⼦集 {5}, {1,4}, {2,3}, {2,3} 等于总和。

```java
class Solution {

    public boolean canPartition(int[] nums) {
        if (nums.length < 2) {
            return false;
        }
        // 先判断能否整除2 即能否等分为两个子集
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        //
        int target = sum / 2;   // 每个子集的和
        int used = 0; // 使⽤位图技巧

        // k 号桶初始什么都没装，从 nums[0] 开始做选择
        return backtrack(2, 0, nums, 0, used, target);

    }

    // 下面为分割等和子集通用回溯法
    HashMap<Integer, Boolean> memo = new HashMap<>();

    boolean backtrack(int k, int bucket,
                      int[] nums, int start, int used, int target) {
        // base case
        if (k == 0) {
            // 所有桶都被装满了，⽽且 nums ⼀定全部⽤完了
            return true;
        }
        if (bucket == target) {
            // 装满了当前桶，递归穷举下⼀个桶的选择
            // 让下⼀个桶从 nums[0] 开始选数字
            boolean res = backtrack(k - 1, 0, nums, 0, used, target);
            // 缓存结果
            memo.put(used, res);
            return res;
        }

        if (memo.containsKey(used)) {
            // 避免冗余计算
            return memo.get(used);
        }
        for (int i = start; i < nums.length; i++) {
            // 剪枝
            if (((used >> i) & 1) == 1) { // 判断第 i 位是否是 1
                // nums[i] 已经被装⼊别的桶中
                continue;
            }
            if (nums[i] + bucket > target) {
                continue;
            }
            // 做选择
            used |= 1 << i; // 将第 i 位置为 1
            bucket += nums[i];
            // 递归穷举下⼀个数字是否装⼊当前桶
            if (backtrack(k, bucket, nums, i + 1, used, target)) {
                return true;
            }
            // 撤销选择
            used ^= 1 << i; // 将第 i 位置为 0
            bucket -= nums[i];
        }
        return false;
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

### 背包问题模板

```java
// dp[][]数组的意义
// dp[i][w]表示对于前i个物品，当前背包承重为w时，可以装下的最大价值
// 状态转移方程     dp[i][w] = 
// 如果没有把第i个物品装入背包 = dp[i - 1][w] 即继承之前的结果
// 如果把第i个物品装入背包    = dp[i-1][w - wt[i - 1]] + val[i - 1] (wt和val数组存的是第i个物品的重量和价值)
int bagSolution(int w, int n, int[] wt, int[] val) {
    // 初始化dp数组
    // 注意：要根据不同题的逻辑来对数组进行初始化
    int[][] dp = new int[n+1][w+1];
    for (int i = 0; i < n + 1; i++) {
        dp[i][0] = 0;
    }
    for (int i = 0; i < w + 1; i++) {
        dp[0][i] = 0;
    }
    // 状态转移
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= w; j++) {
            // 背包容量不够
        	if (w - wt[i - 1] < 0) {
           		dp[i][j] = dp[i - 1][j];
        	} else {
                // 装入或不装入背包 取最大价值
                dp[i][j] = Math.max(dp[i - 1][j], dp[i-1][j - wt[i - 1]] + val[i - 1]);
            }
        }
    }
    // 输出
    return dp[n][w];
}
```

### 416 分割等和子集

给你一个 **只包含正整数** 的 **非空** 数组 `nums` 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

**示例 1：**

```
输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
```

**方法1：**回溯法暴力搜索 会超时 直接套回溯算法分割等和子集模板

```java
class Solution {

    public boolean canPartition(int[] nums) {
        if (nums.length < 2) {
            return false;
        }
        // 先判断能否整除2 即能否等分为两个子集
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        //
        int target = sum / 2;   // 每个子集的和
        int used = 0; // 使⽤位图技巧

        // k 号桶初始什么都没装，从 nums[0] 开始做选择
        return backtrack(2, 0, nums, 0, used, target);

    }

    HashMap<Integer, Boolean> memo = new HashMap<>();

    boolean backtrack(int k, int bucket,
                      int[] nums, int start, int used, int target) {
        // base case
        if (k == 0) {
            // 所有桶都被装满了，⽽且 nums ⼀定全部⽤完了
            return true;
        }
        if (bucket == target) {
            // 装满了当前桶，递归穷举下⼀个桶的选择
            // 让下⼀个桶从 nums[0] 开始选数字
            boolean res = backtrack(k - 1, 0, nums, 0, used, target);
            // 缓存结果
            memo.put(used, res);
            return res;
        }

        if (memo.containsKey(used)) {
            // 避免冗余计算
            return memo.get(used);
        }
        for (int i = start; i < nums.length; i++) {
            // 剪枝
            if (((used >> i) & 1) == 1) { // 判断第 i 位是否是 1
                // nums[i] 已经被装⼊别的桶中
                continue;
            }
            if (nums[i] + bucket > target) {
                continue;
            }
            // 做选择
            used |= 1 << i; // 将第 i 位置为 1
            bucket += nums[i];
            // 递归穷举下⼀个数字是否装⼊当前桶
            if (backtrack(k, bucket, nums, i + 1, used, target)) {
                return true;
            }
            // 撤销选择
            used ^= 1 << i; // 将第 i 位置为 0
            bucket -= nums[i];
        }
        return false;
    }
}
```

**方法2：**动态规划 背包问题模板

分成两个子集，把子集看成背包，就相当于双背包问题，装满背包意思就是，每个子集里的数字和正好等于sum/2

**关键是如何套用0-1背包的模板**

先判断能否整除2，即能否等分

再使用0-1背包模板 判断能不能恰好装满一个背包 当一个背包能够装满时 说明剩余的数恰好也能装满另一个背包

所以本题依然可以使用0-1背包问题的模板

```java
class Solution {

    public boolean canPartition(int[] nums) {
        if (nums.length < 2) {
            return false;
        }
        // 先判断能否整除2 即能否等分为两个子集
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        if (sum % 2 != 0) {
            return false;
        }
        // 背包问题参数
        int n = nums.length;
        int target = sum / 2;   // 每个子集的和 即每个背包的承重
        boolean[][] dp = new boolean[n + 1][target + 1];
        // 初始化dp
        // 背包没有空间时 相当于装满了 所以赋true
        // 没有物品可以选择时 无法装满背包 所以赋false
        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }
        for (int i = 0; i <= target; i++) {
            dp[0][i] = false;
        }
        // 状态转移
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                // 判断背包容量不足时 不装这个数
                if (j - nums[i - 1] < 0) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    // 选择装入或不装入背包
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
                }
            }
        }
        return dp[n][target];
    }
}
```

## 8 DFS深度优先搜索

### dfs搜索框架(图论)

```java
void dfs(int[][] grid, int r, int c) {
    // 1. 在遍历二维列表的过程中，从一个点向四周遍历
	// 会碰到超出数组边界的情况 需要在每次递归调用之前判断是否超出数组边界
    if (!inArea(grid, r, c)) {
        return;
    }
    // 2. 如果这个格子不是岛屿，直接返回
    if (grid[r][c] != 1) {
        return;
    }
    // 3. 防止重复访问同一片区域 遍历过的区域可以打上标记
    grid[r][c] = 2; // 将格子标记为「已遍历过」
    
    // 4. 向该区域的相邻区域发散 访问上、下、左、右四个相邻结点
    dfs(grid, r - 1, c);
    dfs(grid, r + 1, c);
    dfs(grid, r, c - 1);
    dfs(grid, r, c + 1);
}

// 判断坐标 (r, c) 是否在网格中
boolean inArea(int[][] grid, int r, int c) {
    return 0 <= r && r < grid.length 
        	&& 0 <= c && c < grid[0].length;
}

作者：nettee
链接：https://leetcode.cn/problems/number-of-islands/solution/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/
来源：力扣（LeetCode）
```

### 200 岛屿数量

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

示例 1：

输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1

**方法**：使用图的DFS框架，遍历整张图，遇到一块陆地就res++，并且淹没整块岛屿防止重复遍历

```java
class Solution {
    public int numIslands(char[][] grid) {
        int res = 0;
        // 遍历整张图 每发现一块陆地就淹没该片的岛屿
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    res++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return res;
    }

    /**
     * 每发现一个岛屿 就把与之相邻的陆地都淹掉
     * @param grid 图
     * @param i 行
     * @param j 列
     */
    void dfs(char[][] grid, int i, int j) {
        // 数组的边界判断
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // 超出索引边界
            return;
        }
        if (grid[i][j] == '0') {
            // 当前区域是海水
            return;
        }
        // 遍历过的陆地直接淹没 防止之后重复遍历
        grid[i][j] = '0';
        // 淹没相邻的陆地
        dfs(grid, i + 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i - 1, j);
        dfs(grid, i, j - 1);
    }

    
}
```

### 695 岛屿的最大面积

简单题 图的遍历稍作修改

```java
class Solution {

    public int maxAreaOfIsland(int[][] grid) {
        int res = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    // 遍历到陆地
                    // 计算当前岛屿的面积
                    res = Math.max(dfs(grid, i, j), res);
                }
            }
        }
        return res;
    }

    /**
     * 每发现一个岛屿 就把与之相邻的陆地都淹掉
     * 
     * @param grid 图
     * @param i    行
     * @param j    列
     */
    int dfs(int[][] grid, int i, int j) {
        // 数组的边界判断
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // 超出索引边界
            return 0;
        }
        if (grid[i][j] == 0) {
            // 当前区域是海水
            return 0;
        }
        // 遍历过的区域 淹掉
        grid[i][j] = 0;
        // 淹没相邻的陆地
        return 1 + dfs(grid, i + 1, j) +
                dfs(grid, i, j + 1) +
                dfs(grid, i - 1, j) +
                dfs(grid, i, j - 1);
    }

}
```

### 1254 统计封闭岛屿的数目

二维矩阵 `grid` 由 `0` （土地）和 `1` （水）组成。岛是由最大的4个方向连通的 `0` 组成的群，封闭岛是一个 `完全` 由1包围（左、上、右、下）的岛。

请返回 *封闭岛屿* 的数目。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2019/10/31/sample_3_1610.png)

输入：grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
输出：2
解释：
灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。

**方法**：参考200题 在计算岛屿数量的基础上 先排除掉靠边的岛屿

```java
class Solution {

    public int closedIsland(int[][] grid) {
        int res = 0;
        // 排除掉靠边岛屿
        for (int i = 0; i < grid.length; i++) {
            dfs(grid, i, 0);
            dfs(grid, i, grid[0].length - 1);
        }
        for (int i = 0; i < grid[0].length; i++) {
            dfs(grid, 0, i);
            dfs(grid, grid.length - 1, i);
        }
        // 计算封闭岛屿数量
        for (int i = 1; i < grid.length; i++) {
            for (int j = 1; j < grid[0].length; j++) {
                if (grid[i][j] == 0) {
                    res++;
                    dfs(grid, i, j);
                }
            }
        }
        return res;
    }

    /**
     * 每发现一个岛屿 就把与之相邻的陆地都淹掉
     * 
     * @param grid 图
     * @param i    行
     * @param j    列
     */
    void dfs(int[][] grid, int i, int j) {
        // 数组的边界判断
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // 超出索引边界
            return;
        }
        if (grid[i][j] == 1) {
            // 当前区域是海水
            return;
        }
        // 遍历过的区域 淹掉
        grid[i][j] = 1;
        // 淹没相邻的陆地
        dfs(grid, i + 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i - 1, j);
        dfs(grid, i, j - 1);
    }

}
```

### 130 被围绕的区域（并查集）

给你一个 `m x n` 的矩阵 `board` ，由若干字符 `'X'` 和 `'O'` ，找到所有被 `'X'` 围绕的区域，并将这些区域里所有的 `'O'` 用 `'X'` 填充。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg)

```
输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
```

**方法1**：参考统计封闭岛屿数目的方法，先给边缘的陆地打上标记，再把被围绕的区域淹没，最后再把边缘区域还原

```java
class Solution {

    public void solve(char[][] board) {
        // 排除掉靠边岛屿
        for (int i = 0; i < board.length; i++) {
            notIsland(board, i, 0);
            notIsland(board, i, board[0].length - 1);
        }
        for (int i = 0; i < board[0].length; i++) {
            notIsland(board, 0, i);
            notIsland(board, board.length - 1, i);
        }
        // 遍历图
        for (int i = 1; i < board.length; i++) {
            for (int j = 1; j < board[0].length; j++) {
                if (board[i][j] == 'O') {
                    dfs(board, i, j);
                }
            }
        }
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (board[i][j] == 'E') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    /**
     * 每发现一个岛屿 就把与之相邻的陆地都淹掉
     * 
     * @param grid 图
     * @param i    行
     * @param j    列
     */
    void dfs(char[][] grid, int i, int j) {
        // 数组的边界判断
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // 超出索引边界
            return;
        }
        if (grid[i][j] == 'X' || grid[i][j] == 'E') {
            // 当前区域是海水
            return;
        }
        // 遍历过的区域 淹掉
        grid[i][j] = 'X';
        // 淹没相邻的陆地
        dfs(grid, i + 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i - 1, j);
        dfs(grid, i, j - 1);
    }

    void notIsland(char[][] grid, int i, int j) {
        // 数组的边界判断
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n) {
            // 超出索引边界
            return;
        }
        if (grid[i][j] == 'X' || grid[i][j] == 'E') {
            // 当前区域是海水
            return;
        }
        // 遍历过的区域 淹掉
        grid[i][j] = 'E';
        // 淹没相邻的陆地
        notIsland(grid, i + 1, j);
        notIsland(grid, i, j + 1);
        notIsland(grid, i - 1, j);
        notIsland(grid, i, j - 1);
    }
}
```

**方法2**：并查集

**并查集**常用来解决连通性的问题，即将一个图中连通的部分划分出来

并查集的思想就是，同一个连通区域内的所有点的根节点是同一个，使用数组来存储每个节点的根节点

本题把所有的边缘区域看做是一整块联通区域（因为实际上这些区域在图上不是真正的连在一起所以我们需要一个虚拟的根节点）。先预处理，把边界上的O都与一个虚拟根节点相连，接着遍历整张图当发现O时让它与它上下左右四个节点相连（即让它们指向同一个根节点），最后再次遍历整张图，把根节点不为虚拟节点的节点替换为X

**并查集模板类**

```java
/**
 * 并查集
 */
class UF{
    private int[] ID;
    private int[] treeSize;
    public UF(int N){
        ID = new int[N];
        treeSize = new int[N];
        for(int i = 0; i < N; i++){
            ID[i] = i;
            treeSize[i] = 1;
        }
    }

    public int find(int i){
        //查找当前树的根节点
        int root = i;
        while(root != ID[root])
            root = ID[root];

        //路径压缩  所有子节点直接指向根节点
        int next;
        while(i != ID[i]){
            next = ID[i];
            ID[i] = root;
            i = next;
        }
        return root;
    }

    public boolean connected(int p, int q){
        return find(p) == find(q);
    }

    public void union(int p, int q){
        if(find(p) == find(q))
            return;
        if(treeSize[p] < treeSize[q]) //小树链接到大树上
            ID[ID[p]] = ID[q]; //在调用find后，　路径被压缩，　因此ID[p]即为根节点, 同理ID[q]也为根节点
        else
            ID[ID[q]] = ID[p];
    }

    //将二维坐标转化为一维坐标, 便于并查集使用
    //ｘ为二维数组的一维索引，　ｙ为二维数组的二维索引
    public static int flatternTowDim(int x, int y, int width){
        return x * width + y;
    }
}
```

**实现代码**

```java
class Solution {

    //并查集类
    class UF{
        private int[] ID;
        private int[] treeSize;
        public UF(int N){
            ID = new int[N];
            treeSize = new int[N];
            for(int i = 0; i < N; i++){
                ID[i] = i;
                treeSize[i] = 1;
            }
        }

        public int find(int i){
            //查找当前树的根节点
            int root = i;
            while(root != ID[root])
                root = ID[root];

            //路径压缩 所有子节点直接指向根节点
            int next;
            while(i != ID[i]){
                next = ID[i];
                ID[i] = root;
                i = next;
            }
            return root;
        }

        public boolean connected(int p, int q){
            return find(p) == find(q);
        }

        public void union(int p, int q){
            if(find(p) == find(q))
                return;
            if(treeSize[p] < treeSize[q]) //小树链接到大树上
                ID[ID[p]] = ID[q]; //在调用find后，　路径被压缩，　因此ID[p]即为根节点, 同理ID[q]也为根节点
            else
                ID[ID[q]] = ID[p];
        }    
    }

    //将二维坐标转化为一维坐标, 便于并查集使用
    //ｘ为二维数组的一维索引，　ｙ为二维数组的二维索引
    private int flatternTowDim(int x, int y, int width){
        return x * width + y;
    }

    public void solve(char[][] board) {
        if(board.length == 0) return;
        int len = board.length;
        int width = board[0].length;
        int boardSize = len * width;
        UF uf = new UF(boardSize+1);
        //添加一个虚拟节点，所有位于边界的Ｏ节点均与该虚拟节点相连接
        int i, j;
        for(i = 0; i < board.length; i++){
            for(j = 0; j < board[0].length; j++){
                if((i == 0 || i == board.length-1 || j == 0 || j == board[0].length-1) && board[i][j]=='O')
                    uf.union(flatternTowDim(i, j, width), boardSize);
            }
        }

        //遍历搜索相邻的Ｏ，添加到并查集中
        for(i = 0; i < board.length; i++){
            for(j = 0;j < board[0].length; j++){
                if(board[i][j] == 'O'){
                    //将当前Ｏ点与其下右两个方向的Ｏ点相连接(只需要连接你遍历数组的两个方向就可以全部连接了)
                    
                    if(i+1 < board.length && board[i+1][j] == 'O')
                        uf.union(flatternTowDim(i+1, j, width), flatternTowDim(i, j, width));
                    
                    if(j+1 <= board[0].length && board[i][j] == 'O')
                        uf.union(flatternTowDim(i, j+1, width), flatternTowDim(i, j, width));
                }
            }
        }

        //将所有与边界节点不相连的＇Ｏ＇点替换为＇Ｘ＇
        for(i = 0; i < board.length; i++){
            for(j = 0; j < board[0].length; j++){
                if(board[i][j] == 'O' && !uf.connected(flatternTowDim(i, j, width), boardSize))
                    board[i][j] = 'X';
            }
        }
    }
}
```



## 9 BFS广度优先搜索

### 模板

- **能解决的问题**

  在一幅图中找从起点到终点最近的距离

```java
int BFS(Node start, Node end) {
	Queue<Node> q;	// 核心数据结构
    Set<Node> visited;	// 避免走回头路
    
    q.offer(start);	// 讲起点加入队列
    visited.add(start);
    int step = 0;	// 记录扩散的步数
    
    while(q not empty) {
        int sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */
        for (int i = 0; i < sz.size(); i++) {
            Node cur = q.poll();
            /* 重点：这里判断是否达到终点 */
            if (cur is target) {
                return step;
            }
            /* 将cur的相邻节点加入队列 */
            for (Node x : cur.adj()) {
				if (x not in visited) {
                    q.offer(x);
                    visited.add(x);
                }
            }
            /* 重点：在这里更新步数 */
            step++;
		}
    }
}
```

### 111 二叉树的最小深度

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：**叶子节点是指没有子节点的节点。

![img](https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg)

**方法：**start为root节点，end为遍历完所有的节点 遍历过程中当判断到叶子节点时 记录此时的深度 判断是否为最小深度

```java
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList();
        int curDepth = 0;
        // 起点加入队列
        queue.offer(root);
        curDepth++;
        // 遍历当前队列中的一层节点
        while (!queue.isEmpty()) {
            int size = queue.size();
            // 判断该层节点是否有叶子节点
            for (int i = 0; i < size; i++) {
                TreeNode cur = queue.poll();
                // 判断是否为叶子节点
                if (cur.left == null && cur.right == null) {
                    return curDepth;
                }
                // 将与cur节点相邻的节点都加入队列
                if (cur.left != null) {
                    queue.offer(cur.left);
                }
                if (cur.right != null) {
                    queue.offer(cur.right);
                } 
            }
            // 遍历完一层节点 增加步数
            curDepth++;
        }
        return curDepth;
    }
}
```

### 752 打开转盘锁

你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。

```java
class Solution {
    public int openLock(String[] deadends, String target) {
        int step = 0;
        Queue<String> queue = new LinkedList();
        // 用set记录deadend 方便用contains方法判断
        Set<String> deads = new HashSet();
        for (String s : deadends) deads.add(s);
        // 用visited记录已经使用过的密码
        Set<String> visited = new HashSet();
        // 起点
        queue.offer("0000");
        visited.add("0000");
        //
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String cur = queue.poll();
                // 判断是否为deadend
                if (deads.contains(cur)) {
                    continue;
                }
                // 判断是否结束
                if (target.equals(cur)) {
                    return step;
                }
                // 未遍历且不在deadend中的相邻节点加入队列
                for (int j = 0; j < 4; j++) {
                    String up = plusOne(cur, j);
                    if (!visited.contains(up)) {
                        queue.offer(up);
                        visited.add(up);
                    }
                    String down = minusOne(cur, j);
                    if (!visited.contains(down)) {
                        queue.offer(down);
                        visited.add(down);
                    }
                }
            }
            step++;
        }
        return -1;
    }

    String plusOne(String s, int j) {
        char[] ch = s.toCharArray();
        if (ch[j] == '9') {
            ch[j] = '0';
        } else {
            ch[j] += 1;
        }
        return new String(ch);
    }

    String minusOne(String s, int j) {
        char[] ch = s.toCharArray();
        if (ch[j] == '0') {
            ch[j] = '9';
        } else {
            ch[j] -= 1;
        }
        return new String(ch);
    }
}
```

## 10 图论算法

### 797 所有可能路径

给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）

 graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）。

![img](https://assets.leetcode.com/uploads/2020/09/28/all_1.jpg)

**方法**：解法很简单，以 0 为起点遍历图，同时记录遍历过的路径，当遍历到终点时将路径记录下来即可。 既然输⼊的图是无环的，我们就不需要 visited 数组辅助了，可以直接套用图的遍历框架。

```java
/* 图的遍历框架 */
// 回溯
    void backtrack(int[][] graph, int outIndex) {
        // 递归结束的判断
        if (outIndex == graph.length - 1) {
            res.add(new ArrayList(path));
            return;
        }
        // 跟着图的顺序递归
        for (int i = 0; i < graph[outIndex].length; i++) {
            // 处理
            path.add(graph[outIndex][i]);
            // 递归
            backtrack(graph, graph[outIndex][i]);
            // 撤销
            path.removeLast();
        }
    }
```

```java
class Solution {

    List<List<Integer>> res = new ArrayList();
    LinkedList<Integer> path = new LinkedList();

    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        path.add(0);
        backtrack(graph, 0);
        return res;
    }

    // 回溯
    void backtrack(int[][] graph, int outIndex) {
        // 遍历到底结束
        if (outIndex == graph.length - 1) {
            res.add(new ArrayList(path));
            return;
        }
        // 
        for (int i = 0; i < graph[outIndex].length; i++) {
            // 处理
            path.add(graph[outIndex][i]);
            // 递归
            backtrack(graph, graph[outIndex][i]);
            // 撤销
            path.removeLast();
        }
    }
}
```

### 785 判断二分图（双色问题）

存在一个 无向图 ，图中有 n 个节点。其中每个节点都有一个介于 0 到 n - 1 之间的唯一编号。给你一个二维数组 graph ，其中 graph[u] 是一个节点数组，由节点 u 的邻接节点组成。形式上，对于 graph[u] 中的每个 v ，都存在一条位于节点 u 和节点 v 之间的无向边。该无向图同时具有以下属性：
不存在自环（graph[u] 不包含 u）。
不存在平行边（graph[u] 不包含重复值）。
如果 v 在 graph[u] 内，那么 u 也应该在 graph[v] 内（该图是无向图）
这个图可能不是连通图，也就是说两个节点 u 和 v 之间可能不存在一条连通彼此的路径。
二分图 定义：如果能将一个图的节点集合分割成两个独立的子集 A 和 B ，并使图中的每一条边的两个节点一个来自 A 集合，一个来自 B 集合，就将这个图称为 二分图 。

如果图是二分图，返回 true ；否则，返回 false 。

示例 1：![img](https://assets.leetcode.com/uploads/2020/10/21/bi2.jpg)


输入：graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
输出：false
解释：不能将节点分割成两个独立的子集，以使每条边都连通一个子集中的一个节点与另一个子集中的一个节点。

**方法**：双色问题的方法 二分图即每条边的两个节点属于分别属于两个独立的节点集合，那么我们可以用两种颜色来代表这两种集合，在遍历图的所有节点时，分别赋上不同的颜色，判断是否出现两个相邻节点颜色相同的情况。如若遍历中没有出现这种情况则代表此图为二分图。

```java
class Solution {
    // 记录图是否符合⼆分图性质
    private boolean ok = true;
    // 记录图中节点的颜⾊，false 和 true 代表两种不同颜⾊
    private boolean[] color;
    // 记录图中节点是否被访问过
    private boolean[] visited;

    public boolean isBipartite(int[][] graph) {
        color = new boolean[graph.length];
        visited = new boolean[graph.length];
        // 图的遍历 遍历所有的节点下的路径 遇到已经访问过的则不遍历
        for (int i = 0; i < graph.length; i++) {
            if (!visited[i]) {
                backtrack(graph, i);
            }
        }   
        return ok;
    }

    // 图的单条路径遍历 使用回溯框架 即DFS
    private void backtrack(int[][] graph, int outIndex) {
        // 判断
        if (!ok) return;

        visited[outIndex] = true;   // 代表已经访问过该节点
        // 递归遍历
        for (int dot : graph[outIndex]) {
            if (!visited[dot]) {
                // 相邻的节点没有访问过
                // 给这个节点涂上与上个节点不同的颜色
                color[dot] = !color[outIndex];
                // 回溯遍历
                backtrack(graph, dot); 
            } else {
                // 如果已经访问过
                // 判断是否与上个节点颜色不同
                if (color[dot] == color[outIndex]) {
                    // 相同则不是二分图
                    ok = false;
                }
            }
        }
    }
}
```

### 207 课程表

你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

示例 1：

输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

**方法**：转换为图论问题中的查找是否有闭环问题 生成图结构

利⽤布尔数组 path，如果遍历过程中发现下⼀个即将遍历的节点已经被标记为 true，说明遇到了环

```java
class Solution {
    private boolean ok = true;

    private boolean[] visited;

    private boolean[] path;

    public boolean canFinish(int numCourses, int[][] prerequisites) {

        List<Integer>[] graph = buildGraph(numCourses, prerequisites);
        visited = new boolean[numCourses];
        path = new boolean[numCourses];
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i]) {
                backtrack(graph, i);
            }
        }
        return ok;
    }

    void backtrack(List<Integer>[] graph, int outIndex) {
        if (path[outIndex]) {
            // 出现了闭环
            ok = false;
            return;
        }

        // 遍历到没有要求的课程 结束
        if (graph[outIndex].isEmpty()) {
            return;
        }
        //
        visited[outIndex] = true;
        path[outIndex] = true;
        for (int dot : graph[outIndex]) {
            // 加入路径
            backtrack(graph, dot);
        }
        path[outIndex] = false;
    }

    // 生成图结构
    List<Integer>[] buildGraph(int numCourses, int[][] prerequisites) {
        // 图中共有 numCourses 个节点
        List<Integer>[] graph = new LinkedList[numCourses];
            for (int i = 0; i < numCourses; i++) {
                graph[i] = new LinkedList<>();
                }
            for (int[] edge : prerequisites) {
                int from = edge[0];
                int to = edge[1];
                // 修完课程 from 才能修课程 to
                // 在图中添加⼀条从 from 指向 to 的有向边
                graph[from].add(to);
            }
            return graph;
    }
}
```



### 4.26 华为笔试 批量初始化次数

某部门在开发一个代码分析工具，需要分析代码模块之间的赖关系，用来确定模块的初始化顺序、是否有循环依赖等问题，"就量初给化 是指-次可以初始化一个或多个块，例如提块1依赖模块2,模块3也依模块2，但模块1和3没有依赖关系。则必须先"批量初始化”模块2，再“批量初始化“模块1和3。现给定一组模块间的依赖关系，请计算需要“批量初始化"的次数。

输入
(1)第1行只有一个数字,表示模块总数N。

(2)随后的N行依次表示模块1到N的依赖数据。每行的第1个数据表示赖的模块数量不会超过N，之后的数字表示当前模块依赖的块1序列,该序列不会重复出现相同的数字,模块D的取值一定在1.N之内

(3)模块总数N取值范围1<=N<=1000。

(4)每一行里面的数字按1个空格分隔。

输出
输出“批量初始化次数”,若有循环依赖无法完成初始化，则输出-1

样例1

```
输入:
5
3 2 3 4
1 5
1 5
1 5
输出:3
解释: 共5个模块。模块1依赖模块2、3、4;模块2依赖模块5;模块3依赖模块5;模块4依赖模块5;模块5没有依赖任何模块.批量初始化顺序为 {5)->(2,3,4]->(1]，共需"批量初始化"3次。
```

样例2

```
输入:
3
1 2
1 3
1 1
输出:-1
解释:存在循环依赖，无法完成初始化，返回-1
```

**方法**：图的遍历 先构造图的数据结构`List<LinkedList<Integer>>` 里面的`LinkedList`记录了该Index模块的依赖模块列表，外面的`List`记录的是按顺序的模块列表（图也可表示成`LinkedList<Integer>[]`）

再使用回溯算法遍历

循环依赖通过判断 回溯path中是否有相同的节点 有则代表有循环依赖

```java
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 输入处理
        int n = sc.nextInt();
        // 图结构
        List<LinkedList<Integer>> dependency = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            LinkedList<Integer> list = new LinkedList<>();
            int modNum = sc.nextInt();
            for (int j = 0; j < modNum; j++) {
                list.add(sc.nextInt());
            }
            dependency.add(list);
        }
        // 回溯算法
        for (int i = 0; i < dependency.size(); i++) {
            backtrack(dependency, i);
        }
        // 输出结果
        System.out.println(maxDepth);
    }

    static int maxDepth = 0;
    static LinkedList<Integer> path = new LinkedList<>();
    static ArrayList<Integer> memo = new ArrayList<>(); // 备忘录 记录每一个模块的依赖深度

    // 什么时候结束 当没有依赖时结束
    // nums 表示待遍历的图 outIndex 表示模块的序号
    static void backtrack(List<LinkedList<Integer>> nums, int outIndex) {
        // 出现循环依赖 直接终止后面的递归
        if (-1 == maxDepth) {
            return;
        }
        // 遍历到没有依赖的模块 代表结束
        if (nums.get(outIndex).isEmpty()) {
            maxDepth = Math.max(maxDepth, path.size() + 1);
            return;
        }
        for (int i = 0; i < nums.get(outIndex).size(); i++) {
            // 处理
            int nextMod = nums.get(outIndex).get(i) - 1;
            if (path.contains(nextMod)) {
                // path中出现重复的模块说明存在循环依赖 返回值为-1
                maxDepth = -1;
                return;
            } else {
                path.add(nextMod);
            }
            // 递归
            backtrack(nums, nextMod);
            // 撤销选择
            path.removeLast();
        }
    }
}
```

## 11 数据结构设计

### 146 LRU缓存

请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以 正整数 作为容量 `capacity` 初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value` ；如果不存在，则向缓存中插入该组 `key-value` 。如果插入操作导致关键字数量超过 `capacity` ，则应该 逐出 最久未使用的关键字。

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。

```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

**方法**：该题的关键是找一个能满足函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行的数据结构

哈希表查找快，但是数据⽆固定顺序；链表有顺序之分，插⼊删除快，但是查找慢，所以结合⼆者的⻓处， 可以形成⼀种新的数据结构：哈希链表 `LinkedHashMap`

```java
class LRUCache {

    int cap;    // 缓存容量
    LinkedHashMap<Integer, Integer> cache = new LinkedHashMap();

    public LRUCache(int capacity) {
        this.cap = capacity;
    }

    // 删除key 重新插入到队尾 表示它最近使用过
    private void makeRecently(int key) {
        int val = cache.get(key);
        // 删除key 重新插入到队尾 表示它最近使用过
        cache.remove(key);
        cache.put(key, val);
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) {
            return -1;
        }
        // 将key变为最近使用
        makeRecently(key);
        return cache.get(key);
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            // 修改原key值
            cache.put(key, value);
            // 最近使用
            makeRecently(key);
            return;
        }
        // 缓存中不存在该key 且缓存已满
        if (cache.size() >= this.cap) {
            // 删除头部的key 即最久未用的key
            int oldestKey = cache.keySet().iterator().next();
            cache.remove(oldestKey);
        }
        // 将新的key添加到链表尾部
        cache.put(key, value);
    }
}
```

### 380 O(1)时间插入、删除和获取随机元素

实现RandomizedSet 类：

RandomizedSet() 初始化 RandomizedSet 对象
bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。
bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。
你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。

**方法**：HashSet做不到随机在O(1)时间获取元素，必须使用紧凑数组

数组可以快速的获取对应元素 所以使用数组来存储数据 但是使用数组 插入和删除的时间复杂度又不可能是O(1)

所以我们需要用一个Map来记录元素对应的索引，这样插入和删除查找下标时可以直接通过Map来查找

```java
class RandomizedSet {
    // 存储元素的值
    List<Integer> nums;
    // 记录每个元素对应在 nums 中的索引
    Map<Integer, Integer> indices;
    // 随机数
    Random random;

    public RandomizedSet() {
        nums = new ArrayList<Integer>();
        indices = new HashMap<Integer, Integer>();
        random = new Random();
    }

    public boolean insert(int val) {
        if (indices.containsKey(val)) {
            return false;
        }
        int index = nums.size();
        nums.add(val);
        indices.put(val, index);
        return true;
    }

    public boolean remove(int val) {
        if (!indices.containsKey(val)) {
            return false;
        }
        // 待删除数的索引
        int index = indices.get(val);
        int last = nums.get(nums.size() - 1);
        // 末尾数替换到删除数的位置
        nums.set(index, last);
        // 末尾数的索引更改为删除数的索引
        indices.put(last, index);
        // 删除nums末尾的多余数
        nums.remove(nums.size() - 1);
        // 删除val对应的索引
        indices.remove(val);
        return true;
    }

    public int getRandom() {
        int randomIndex = random.nextInt(nums.size());
        return nums.get(randomIndex);
    }
}
```



## ACM输入输出

### 1 多行输入

#### 示例

```undefined
输入：
5 10 9
0 5
9 1
8 1
0 1
9 100
```

```cpp
import java.util.Arrays;
import java.util.Scanner;

public class MultilineInput {
    public static void main(String[] args) {
        //Scanner类默认的分隔符就是空格
        Scanner sc=new Scanner(System.in);
        while(sc.hasNext()){
            int n=sc.nextInt();
            int full=sc.nextInt();
            int avg=sc.nextInt();
            int[][] nums=new int[n][2];
            for(int i=0;i<n;i++){
                nums[i][0]=sc.nextInt();
                nums[i][1]=sc.nextInt();
            }
            
            // 输出描述:
            // 一行输出答案。
            // 输出
            // 43
            System.out.println(time);
        }
    }
}
```

### 2 数组输入

#### 示例

```css
输入例子:
7 15
15 5 3 7 9 14 0
```

#### 2.1 读取一维数组

```java
Scanner cin = new Scanner(System.in);
while(cin.hasNext()) {
    int r = cin.nextInt(); // 行数
    int[] matrix = new int[r];
    cin.nextLine(); // 跳过行数后的换行符
    for(int i=0;i<r;i++) {
        for (int j = 0; j < c; j++) {
            matrix[i] = cin.nextInt();
        }
    }
}
```

#### 2.2 读取二维数组

如果要求的测试用例需要读取二维数组，我们应该先读取二维数组的长度和宽度存在两个整数中。在下一行将一串整型数字存入二维数组中。
 注意：为了换行读取可以使用`nextLine()`跳过换行;

```java
Scanner cin = new Scanner(System.in);
while(cin.hasNext()) {
    int r = cin.nextInt();
    int c = cin.nextInt();
    int[][] matrix = new int[r][c];
    cin.nextLine(); // 跳过行数和列数后的换行符
    for(int i=0;i<r;i++) {
        for (int j = 0; j < c; j++) {
            matrix[i][j] = cin.nextInt();
        }
    }
}
```

### 3 链表输入

以反转链表为例

```csharp
import java.util.Scanner;
import java.util.Stack;

public class LinkListInput {
    //题目描述
    //对于一个链表 L: L0→L1→…→Ln-1→Ln,
    //将其翻转成 L0→Ln→L1→Ln-1→L2→Ln-2→…

    //先构建一个节点类，用于链表构建
    static class LinkNode {
        int val;
        LinkNode next;
        public LinkNode(int val){
            this.val = val;
        }
    }

    public static void main(String[] args){
        //输入是一串数字，请将其转换成单链表格式之后，再进行操作
        //输入描述:
        //一串数字，用逗号分隔
        //输入
        //1,2,3,4,5
        Scanner scanner = new Scanner(System.in);
        //以字符串形式作为输入
        String str = scanner.next().toString();
        //通过分隔符将其转为字符串数组
        String[] arr  = str.split(",");
        //初始化一个整数数组
        int[] ints = new int[arr.length];
        //给整数数组赋值
        for(int j = 0; j<ints.length;j++) {
            ints[j] = Integer.parseInt(arr[j]);
        }
        Stack<LinkNode> stack = new Stack<>();
        LinkNode head = new LinkNode(0);
        LinkNode p = head;
        //链表初始化并放入stack中
        for(int i = 0; i < ints.length; i++){
            p.next = new LinkNode(ints[i]);
            p = p.next;
            stack.add(p);
        }
        head = head.next;
        //开始链表转换
        p = head;
        LinkNode q = stack.peek();
        while ((!p.equals(q)) && (!p.next.equals(q))) {
            q = stack.pop();
            q.next = p.next;
            p.next = q;
            p = p.next.next;
            q = stack.peek();
        }
        q.next = null;
        //输出
        //1,5,2,4,3
        //打印
        while (head != null) {
            if(head.next == null){
                System.out.print(head.val);
            }else{
                System.out.print(head.val + ",");
            }
            head = head.next;
        }
    }
}
```

### 4 树的输入

以判断是否是二叉搜索树为例

把node.val存入数组，把对应的左右节点的值也存入数组

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

//题目描述
//给定一个二叉树，判断其是否是一个有效的二叉搜索树。
//假设一个二叉搜索树具有如下特征：
//节点的左子树只包含小于当前节点的数。
//节点的右子树只包含大于当前节点的数。
//所有左子树和右子树自身必须也是二叉搜索树。
//例如：
//输入：
//    5
//   / \
//  1   3
//     / \
//    4   6
//输出: false

//构造树需要的结点类
class TreeNode {
    TreeNode left, right;
    int val;

    public TreeNode(int val) {
        this.val = val;
    }
}

public class TreeInput {
    public static void main(String[] args) throws IOException {
        //输入描述:
        //第一行两个数n,root，分别表示二叉树有n个节点，第root个节点时二叉树的根
        //接下来共n行，第i行三个数val_i,left_i,right_i，
        //分别表示第i个节点的值val是val_i,左儿子left是第left_i个节点，右儿子right是第right_i个节点。
        //节点0表示空。
        //1<=n<=100000,保证是合法的二叉树
        //输入
        //5 1
        //5 2 3
        //1 0 0
        //3 4 5
        //4 0 0
        //6 0 0
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String[] s = reader.readLine().split(" ");
        int n = Integer.parseInt(s[0]);
        int root = Integer.parseInt(s[1]);
        TreeNode[] tree = new TreeNode[n + 1];
        int[][] leaf = new int[n + 1][2];
        for (int i = 1; i <= n; i++) {
            String[] ss = reader.readLine().split(" ");
            int val_i = Integer.parseInt(ss[0]);
            int left_i = Integer.parseInt(ss[1]);
            int right_i = Integer.parseInt(ss[2]);
            TreeNode node = new TreeNode(val_i);
            leaf[i][0] = left_i;
            leaf[i][1] = right_i;
            tree[i] = node;
        }
        for (int i = 1; i <= n; i++) {
            int left = leaf[i][0];
            if (left != 0) {
                tree[i].left = tree[left];
            } else {
                tree[i].left = null;
            }
            int right = leaf[i][1];
            if (right != 0) {
                tree[i].right = tree[right];
            } else {
                tree[i].right = null;
            }
        }
        TreeNode head = tree[root];
        boolean flag = isBinarySearchTree(head);
        System.out.println(flag);

    }

    private static boolean isBinarySearchTree(TreeNode node) {
        if(node == null){
            return true;
        }
        int pre = Integer.MIN_VALUE;
        Stack<TreeNode> s = new Stack<>();

        while(!s.isEmpty() || node != null){
            while(node != null){
                s.push(node);
                node = node.left;
            }
            node = s.pop();
            if(node == null){
                break;
            }
            if(pre > node.val){
                return false;
            }
            pre = node.val;
            node = node.right;
        }
        return true;
    }
}
```

作者：小雨Coding
链接：https://www.jianshu.com/p/4be070789f7a
