import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Java",
    icon: "pen-to-square",
    prefix: "/java/",
    children: [
      { text: "Java基础", icon: "pen-to-square", link: "Java基础笔记", },
      { text: "JavaWeb", icon: "pen-to-square", link: "JavaWeb笔记" },
      { text: "JUC", icon: "pen-to-square", link: "JUC并发编程" },
      { text: "Spring", icon: "pen-to-square", link: "Spring笔记" },
      { text: "MyBatis", icon: "pen-to-square", link: "MyBatis笔记" },
      { text: "SpringCloud", icon: "pen-to-square", link: "微服务SpringCloud笔记" },
    ],
  },
  {
    text: "Cpp",
    icon: "pen-to-square",
    prefix: "/cpp/",
    children: [
      { text: "C++拾遗", icon: "pen-to-square", link: "Cpp补完计划", },
    ],
  },
  {
    text: "数据库",
    icon: "pen-to-square",
    prefix: "/database/",
    children: [
      { text: "MySQL", icon: "pen-to-square", link: "MySQL补完计划", },
    ],
  },
  {
    text: "计算机网络",
    icon: "pen-to-square",
    prefix: "/network/",
    children: [
      { text: "HTTP", icon: "pen-to-square", link: "图解HTTP笔记", },
    ],
  },
  {
    text: "算法",
    icon: "pen-to-square",
    prefix: "/leetcode/",
    children: [
      { text: "刷题", icon: "pen-to-square", link: "LeetCode 刷题", },
    ],
  },
  {
    text: "随笔",
    icon: "pen-to-square",
    prefix: "/essay/",
    children: [
      { text: "设计模式", icon: "pen-to-square", link: "设计模式笔记", },
      { text: "朝花夕拾", icon: "pen-to-square", link: "朝花夕拾", },
    ],
  },
]);
