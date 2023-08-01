import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Java",
    icon: "java",
    prefix: "/java/",
    children: [
      { text: "Java基础", icon: "java", link: "Java基础笔记", },
      { text: "JavaWeb", icon: "java", link: "JavaWeb笔记" },
      { text: "JUC", icon: "java", link: "JUC并发编程" },
      { text: "Spring", icon: "java", link: "Spring笔记" },
      { text: "MyBatis", icon: "java", link: "MyBatis笔记" },
      { text: "SpringCloud", icon: "java", link: "微服务SpringCloud笔记" },
    ],
  },
  {
    text: "Cpp",
    icon: "c",
    prefix: "/cpp/",
    children: [
      { text: "C++拾遗", icon: "c", link: "Cpp补完计划", },
    ],
  },
  {
    text: "数据库",
    icon: "relation",
    prefix: "/database/",
    children: [
      { text: "MySQL", icon: "mysql", link: "MySQL补完计划", },
    ],
  },
  {
    text: "计算机网络",
    icon: "network",
    prefix: "/network/",
    children: [
      { text: "HTTP", icon: "http", link: "图解HTTP笔记", },
    ],
  },
  {
    text: "算法",
    icon: "ability",
    prefix: "/leetcode/",
    children: [
      { text: "刷题", icon: "rank", link: "LeetCode 刷题", },
      { text: "剑指Offer", icon: "rank", link: "剑指Offer", },
    ],
  },
  {
    text: "随笔",
    icon: "note",
    prefix: "/essay/",
    children: [
      { text: "设计模式", icon: "condition", link: "设计模式笔记", },
      { text: "朝花夕拾", icon: "write", link: "朝花夕拾", },
    ],
  },
]);
