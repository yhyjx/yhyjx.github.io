import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "YuHao's Blog",
  description: "跟上时代的脚步🦶，卷起来",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "https://imgse.com/i/ppqVWnS" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "我的笔记", link: "/我的笔记/" },
      { text: "前端八股文", link: "/前端八股文/" },
      { text: "常见问题", link: "/常见问题/" },
    ],

    outlineTitle: "大纲",

    outline: "deep",

    sidebar: {
      "/我的笔记/": [
        {
          text: "JavaScript",
          collapsed: true,
          items: [
            {
              text: "游览器工作原理及V8引擎",
              link: "/我的笔记/JavaScript/游览器工作原理及V8引擎",
            },
          ],
        },
        {
          text: "Vue",
          collapsed: true,
          items: [],
        },
        {
          text: "React",
          collapsed: true,
          items: [],
        },
        {
          text: "node.js",
          collapsed: true,
          items: [],
        },
        {
          text: "常用工具",
          collapsed: true,
          items: [
            {
              text: "webpack",
              link: "/我的笔记/常用工具/webpack",
            },
            {
              text: "vitepress",
              link: "/我的笔记/常用工具/vitepress",
            },
          ],
        },
      ],
      "/常见问题/": [
        {
          text: "test1",
          collapsed: true,
          items: [{ text: "01-test", link: "/常见问题/test1/01-test" }],
        },
      ],
      "/前端八股文/": [
        { text: "JavaScript", link: "/前端八股文/JavaScript" },
        { text: "Vue", link: "/前端八股文/Vue" },
        { text: "Css", link: "/前端八股文/Css" },
        { text: "游览器及HTTP", link: "/前端八股文/游览器及HTTP" },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Hao Yu",
    },
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
