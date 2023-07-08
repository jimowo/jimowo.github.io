---
title: MySQL补完计划
author: jimowo
icon: mysql
date: 2022-08-08
order: 1
category:
  - 数据库
tag:
  - MySQL
---

# MySQL补完计划

## 1 Date数据类型的加减

```mysql
Create table If Not Exists Activity (player_id int, device_id int, event_date date, games_played int)
Truncate table Activity
insert into Activity (player_id, device_id, event_date, games_played) values ('1', '2', '2016-03-01', '5')
insert into Activity (player_id, device_id, event_date, games_played) values ('1', '2', '2016-03-02', '6')
insert into Activity (player_id, device_id, event_date, games_played) values ('2', '3', '2017-06-25', '1')
insert into Activity (player_id, device_id, event_date, games_played) values ('3', '1', '2016-03-02', '0')
insert into Activity (player_id, device_id, event_date, games_played) values ('3', '4', '2018-07-03', '5')
```

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
（player_id，event_date）是此表的主键。
这张表显示了某些游戏的玩家的活动情况。
每一行是一个玩家的记录，他在某一天使用某个设备注销之前登录并玩了很多游戏（可能是 0）。
编写一个 SQL 查询，报告在首次登录的第二天再次登录的玩家的比率，四舍五入到小数点后两位。换句话说，您需要计算从首次登录日期开始至少连续两天登录的玩家的数量，然后除以玩家总数。

查询结果格式如下所示：

Activity table:
+-----------+-----------+------------+--------------+
| player_id | device_id | event_date | games_played |
+-----------+-----------+------------+--------------+
| 1         | 2         | 2016-03-01 | 5            |
| 1         | 2         | 2016-03-02 | 6            |
| 2         | 3         | 2017-06-25 | 1            |
| 3         | 1         | 2016-03-02 | 0            |
| 3         | 4         | 2018-07-03 | 5            |
+-----------+-----------+------------+--------------+

Result table:
+-----------+
| fraction  |
+-----------+
| 0.33      |
+-----------+
只有 ID 为 1 的玩家在第一天登录后才重新登录，所以答案是 1/3 = 0.33

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/game-play-analysis-iv
```

使用`select player_id, Date(min(event_date+1)), INTERVAL 1 DAY) from Activity group by player_id`来查出第二天登录表时，`Date(min(event_date+1))`对于月末的日期的加减会有问题，使用函数`DATE_ADD(min(event_date)`就不会有这种问题

## 2 条件判断函数-CASE WHEN用法

**1、简单函数**

```text
CASE 字段 WHEN 预期值 THEN 结果1 ELSE 结果2 END
```

**2、条件表达式**

CASE的简单函数使用简便，但无法应对较为复杂的场景，这就需要用到条件表达式了，其语法结构如下：

```text
CASE 
	WHEN condition THEN result1  ELSE result2
END
```

解释一下，语句中的condition是条件判断，如果该判断结果为true，那么CASE语句将返回result，否则返回result2，如果没有ELSE，则返回null。CASE与END之间可以有多个WHEN…THEN…ELSE语句。END表示CASE语句结束。

## 3 GROUP BY 多字段查询

参考[1050. 合作过至少三次的演员和导演](https://leetcode.cn/problems/actors-and-directors-who-cooperated-at-least-three-times/)

写一条SQL查询语句获取合作过至少三次的演员和导演的 id 对 `(actor_id, director_id)`

```
ActorDirector 表：
+-------------+-------------+-------------+
| actor_id    | director_id | timestamp   |
+-------------+-------------+-------------+
| 1           | 1           | 0           |
| 1           | 1           | 1           |
| 1           | 1           | 2           |
| 1           | 2           | 3           |
| 1           | 2           | 4           |
| 2           | 1           | 5           |
| 2           | 1           | 6           |
+-------------+-------------+-------------+

Result 表：
+-------------+-------------+
| actor_id    | director_id |
+-------------+-------------+
| 1           | 1           |
+-------------+-------------+
唯一的 id 对是 (1, 1)，他们恰好合作了 3 次。
```

因为需要根据 actor_id, director_id 来分组，两种处理方法，一个是直接使用`group by`，另一种是使用`CONCAT_WS(spector, str1, str2)`，把actor_id, director_id合成一个字段来查询

> CONCAT_WS 和普通的CONCAT 函数的区别是，前者可以在拼接的字符间添加连接符，后者不能添加会导致拼接的字符串无法表示唯一的对应关系（比如 1 和11 拼接为111，而111 还可以表示11 1）