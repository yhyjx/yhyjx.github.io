import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { SearchPlugin } from "vitepress-plugin-search";
import generateNav from "./utils/generateNav";
import generateSider from "./utils/generateSider";

// https://vitepress.dev/reference/site-config
const dev = process.env.NODE_ENV;
export default defineConfig({
  lang: "zh-CN",
  title: "随心记录",
  description: "跟上时代的脚步🦶，卷起来",
  appearance: "dark",
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: dev === "development" ? "../favicon.ico" : "/favicon.ico",
      },
    ],
  ],
  themeConfig: {
    nav: generateNav(),
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题切换",
    lastUpdatedText: "最近更新",
    outlineTitle: "大纲",
    outline: "deep",
    sidebar: generateSider(),
    socialLinks: [
      { icon: "github", link: "https://github.com/yhyjx/yhyjx.github.io" },
    ],
    footer: {
      message: `<a href='https://beian.miit.gov.cn/' target="_blank">京ICP备2022029537号</a>`,
      copyright: "Copyright © 2023-present Hao Yu",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    returnToTopLabel: "直达顶部",
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  vite: {
    plugins: [
      SearchPlugin({
        tokenize: "forward",
        previewLength: 62,
        buttonLabel: "搜索",
        placeholder: "搜索文档",
        allow: [],
        ignore: [],
      }),
    ],
  },
});
