---
title: 剑指Offer
author: jimowo
icon: rank
date: 2022-07-26
order: 2
category:
  - 算法
tag:
  - 刷题
  - 排序
  - 剑指Offer
---

# 剑指Offer刷题

## [剑指 Offer 13. 机器人的运动范围](https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

### 思路

有约束的dfs题 

输入给了二维数组信息和约束条件 

返回值为int

### 题解

```java
class Solution {
    public int movingCount(int m, int n, int k) {
        // 生成二维方格数组
        int[][] board = new int[m][n];
        return dfs(board, 0, 0, k);
    }

    int dfs(int[][] board, int i, int j, int k) {
        // 如果超出数组边界，数位和大于k，走到遍历过的区域返回0
        if(i >= board.length || i < 0 ||
            j >= board[0].length || j < 0 ||
            calcSum(i) + calcSum(j) > k ||
            board[i][j] == -1) return 0;
        // 防止访问同一片区域 遍历过的区域打上标记
        board[i][j] = -1;
        return 1 + dfs(board, i + 1, j, k) + dfs(board, i - 1, j, k) + 
                      dfs(board, i, j + 1, k) + dfs(board, i , j - 1, k);
    }

    // 计算一个数的数位之和
    static int calcSum(int x) {
        int sum = 0;
        while (x != 0) {
            sum += x % 10;
            x /= 10;
        }
        return sum;
    }
}
```

## [剑指 Offer 14- I. 剪绳子](https://leetcode.cn/problems/jian-sheng-zi-lcof/)

### 思路

动态规划题

重复子问题为不同长度的绳子 剪完子段的最大乘积

状态转移：`dp[i]` 与前面的状态有什么关系
长度`i` 剪一段`j` ，分为长度`j` 和长度`i-j` 两段，这时最大乘积就有两种选择，一种是最大乘积为这两段的乘积`j×(1-j)` ，两一种是将其中一段继续剪，那样最大乘积就为`j×dp[i-j]`。
这样就确定了状态转移方程

### 题解

```java
class Solution {
    public int cuttingRope(int n) {
        int[] dp = new int[n + 1];
        dp[2] = 1;
        for (int i = 3; i <  n + 1; i++) {
            int curMax = 0;
            // 遍历所有剪法 找到一个当前长度的乘积最大剪法
            for (int j = 2; i - j > 0; j++) {
                curMax = Math.max(dp[i - j] * j, (i - j) * j);
                dp[i] = Math.max(dp[i], curMax);
            }
        }
        return dp[n];
    }
}
```

## [剑指 Offer 14- II. 剪绳子 II](https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/)

### 思路

该题与上题逻辑相同，多了一步大数取模

在每一步的操作上都要取模，取模后的结果无法用`Math.max()`来比较，所以本体无法使用动态规划

使用贪心算法，每3剪一次绳，此时的乘积最大

### 题解

```java
class Solution {
    public int cuttingRope(int n) {
        if(n == 2)
            return 1;
        if(n == 3)
            return 2;
        long res = 1;
        while(n > 4){
            res *= 3;
            res = res % 1000000007;
            n -= 3;
        }
        return (int)(res * n % 1000000007);
    }
}
```

## [剑指 Offer 16. 数值的整数次方](https://leetcode.cn/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

### 思路

常规的循环相乘x 的方法会超时

使用快速幂法，二分法的思路，把幂指数二分，这样时间复杂度就变成了log2N

```java
class Solution {
    public double myPow(double x, int n) {
        if(x == 0) return 0;
        long b = n;
        double res = 1.0;
        if(b < 0) {
            x = 1 / x;
            b = -b;
        }
        while(b > 0) {
            if((b % 2) == 1) res *= x;
            x *= x;
            b /= 2;
        }
        return res;
    }
}
```

