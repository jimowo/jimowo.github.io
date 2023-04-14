import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';
import book from '../book.json';
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { resolve } from "path";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
    lang: 'zh-CN',
    title: book.title,
    description: book.description,
    base: '/',
    head: [],
    theme: defaultTheme({
        docsBranch: 'main',
        navbar: [{
                text: '个人仓库',
                link: 'https://github.com/jimowo',
            },
            {
                text: 'Bilibili',
                link: 'https://space.bilibili.com/3343507',
            }
        ],
        repo: 'jimowo/jimowo.github.io',
        sidebar: [{
                'text': '前言',
                'link': '/',
            },
            'Java基础笔记.md',
            '图解HTTP笔记.md',
            'JavaWeb笔记.md',
            'Spring笔记.md',
            'MyBatis笔记.md',
            '设计模式笔记.md',
            'LeetCode 刷题.md',
            'APPENDIX.md',
        ],
    }),
    plugins: [
        googleAnalyticsPlugin({
            id: '',
        }),
        registerComponentsPlugin({
            components: {
                Adsense: resolve(__dirname, './components/adsense.vue'),
            },
        }),
    ],
});