import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "随心记录",
  description: "个人笔记及文档记录 📝",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "JavaScript", link: "/01-JavaScript/" },
      { text: "Vue3", link: "/02-Vue3/" },
      { text: "React", link: "03-React/" },
      { text: "node.js", link: "/04-node.js/" },
      { text: "复习文档", link: "/05-review/JavaScript" },
      { text: "常见问题", link: "/06-常见问题/" },
      { text: "webpack", link: "/07-webpack/" },
    ],

    outlineTitle: "文章目录",

    outline: "deep",

    sidebar: {
      "01-JavaScript": [
        {
          text: "JavaScript",
          items: [
            {
              text: "游览器工作原理及V8引擎",
              link: "/01-JavaScript/游览器工作原理及V8引擎",
            },
            {
              text: "游览器工作原理及V8引擎",
              link: "/01-JavaScript/游览器工作原理及V8引擎",
            },
            {
              text: "游览器工作原理及V8引擎",
              link: "/01-JavaScript/游览器工作原理及V8引擎",
            },
          ],
        },
      ],
      "02-Vue3": [
        {
          text: "Vue3",
          items: [],
        },
      ],
      "03-React": [
        {
          text: "React",
          items: [],
        },
      ],
      "04-node.js": [
        {
          text: "node.js",
          items: [],
        },
      ],
      "/05-review/": [
        {
          text: "复习文档",
          items: [
            { text: "JavaScript", link: "/05-review/JavaScript" },
            { text: "Vue", link: "/05-review/Vue" },
            { text: "Css", link: "/05-review/Css" },
            { text: "游览器及HTTP", link: "/05-review/游览器及HTTP" },
          ],
        },
      ],
      "/06-常见问题/": [
        {
          text: "test1",
          items: [{ text: "01-test", link: "/06-常见问题/test1/01-test" }],
        },
      ],
      "07-webpack": [
        {
          text: "webpack",
          items: [],
        },
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
