import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Java",
      icon: "book",
      prefix: "java/",
      children: "structure",
    },
    {
      text: "Cpp",
      icon: "book",
      prefix: "cpp/",
      children: "structure",
    },
    {
      text: "数据库",
      icon: "book",
      prefix: "database/",
      children: "structure",
    },
    {
      text: "计算机网络",
      icon: "book",
      prefix: "network/",
      children: "structure",
    },
    {
      text: "算法",
      icon: "book",
      prefix: "leetcode/",
      children: "structure",
    },
    {
      text: "随笔",
      icon: "book",
      prefix: "essay/",
      children: "structure",
    },
    "intro",
  ],
});
