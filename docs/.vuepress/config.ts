import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "博客|随笔|项目",
  description: "博客|随笔|项目",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
