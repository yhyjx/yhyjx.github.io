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
  title: "YuHao's Blog",
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
    outlineTitle: "大纲",
    outline: "deep",
    sidebar: generateSider(),
    socialLinks: [
      { icon: "github", link: "https://github.com/yhyjx/yhyjx.github.io" },
    ],
    footer: {
      message: "京ICP备2022029537号",
      copyright: "Copyright © 2023-present Hao Yu",
    },
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
