import { MyTheme } from "./theme/index.js";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default MyTheme({
  hostname: "https://jimowo.github.io",

  author: {
    name: "Jimowo",
    url: "https://jimowo.github.io",
  },

  iconAssets: "iconfont",
  favicon: "/logo_pixian.png",

  logo: "/logo_pixian.png",

  repo: "https://github.com/jimowo/jimowo.github.io",

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "Powered by VuePress|Theme by Hope",

  displayFooter: true,

  blog: {
    description: "控制硕士在读 后端开发",
    intro: "/intro.html",
    medias: {
      BiliBili: "https://space.bilibili.com/3343507",
      Email: "mailto:13905142704@163.com",
      GitHub: "https://github.com/jimowo",
      Gmail: "mailto:yanmingkui44@gmail.com",
      Steam: "https://steamcommunity.com/id/jimowo/",
      // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
    },
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    blog: true,

    comment: {
      // You should generate and use your own comment service
      provider: "Waline",
      serverURL: "https://waline-comment.vuejs.press",
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
