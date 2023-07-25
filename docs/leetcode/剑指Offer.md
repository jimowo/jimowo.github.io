---
title: 剑指Offer
author: jimowo
icon: rank
date: 2022-07-25
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

