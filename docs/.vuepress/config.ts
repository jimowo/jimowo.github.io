import { defineUserConfig, viteBundler } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { hitokotoPlugin } from "./plugins/vuepress-plugin-hitokoto";
import { popperPlugin } from "./plugins/vuepress-plugin-popper";
import { MeteorPlugin } from "./plugins/vuepress-plugin-meteor";
import { PopperShape } from "@moefy-canvas/theme-popper";
import { ohmylive2dPlugin } from "vuepress-plugin-oh-my-live2d";
import { live2DAssistPlugin } from "./plugins/vuepress-plugin-live2DAssist";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "博客|随笔|项目",
  // description: "博客|随笔|项目",

  theme,

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          "/bing": {
            target: "https://cn.bing.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/bing/, ""),
          },
        },
      },
    },
    // vuePluginOptions: {},
  }),

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    // 一言插件
    hitokotoPlugin({}),
    // 搜索插件
    searchProPlugin({
      // 配置选项
      indexContent: true
    }),
    // 鼠标特效插件
    popperPlugin({
      config: {
        shape: PopperShape.Circle,
        size: 1.95,
        numParticles: 10,
      },
    }),
    // 流星插件
    MeteorPlugin({
      config: {
        numParticles: null,
        particleColor: {
          light: 'rgba(102, 175, 239, .2)',
          dark: 'rgba(245, 236, 66, .2)',
        },
      }
    }),
    // 看板娘插件
    ohmylive2dPlugin({
      // 在这里进行配置
      source: "/assets/live2D",
      models: [
        {
          scale: 0.3,
          path: "/lafei_4/lafei_4.model3.json",
        },
        {
          scale: 0.7,
          path: "/z46_2/z46_2.model3.json",
        },
        {
          scale: 0.3,
          path: "/sipeibojue_5/sipeibojue_5.model3.json",
        },
      ],
      tips: {
        style: {
          width: 150,
          height: 100,
          offsetX: 0,
          offsetY: 90,
        },
      },
    }),
  ],
});
