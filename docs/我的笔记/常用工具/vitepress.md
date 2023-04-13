# vitepress 使用

## 创建项目

选择一个目录，或新建目录新建项目

```Shell
mkdir book-press && cd book-press
```

## 初始化项目

- npm
- yarn
- pnpm

三者任选其一，官方推荐 pnpm，该文档采用 npm 

```Shell
npm init -y // -y 可选可不选，只做演示
```

## 安装 vitepress

安装 vitepress 

```shell
npm i -D vitepress
```

初始化 vitepress

```shell
npx vitepress init
```

[![全部默认就好](https://s1.ax1x.com/2023/04/12/ppX8IW6.png)](https://imgse.com/i/ppX8IW6)

如上图所示，除了主题选项为 `Default Theme + Customization` 外其余默认就好，初始化后目录结构如下

```markdown
book-press
├── .vitepress
│   ├── theme
│   └── config.ts
├── api-examples.md
├── index.md
├── markdown-examples.md
├── package-lock.json
└── package.json
```

## 首页示范

参考 https://vitepress.dev/reference/default-theme-home-page

```markdown
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "YuHao"
  text: "欢迎来到我的博客 👏"
  tagline: "跟上时代的脚步🦶 卷起来 🥱 ..."
  image:
    src: ""

  actions:
    - theme: brand
      text: 🌞 我的笔记
      link: /我的笔记/
    - theme: alt
      text: 🌟 常见问题
      link: /常见问题/

features:
  - title: 我的笔记
    icon: 🌞
    details: 养成写笔记的习惯，记录知识、形成体系
  - title: 前端八股文
    icon: 🌛
    details: 总有那么一段时间，一遍又一遍的背诵着它
  - title: 常见问题
    icon: 🌟
    details: 记录开发中遇到的问题，方便日后复盘
---
```

效果如下

[![ppXGoAs.png](https://s1.ax1x.com/2023/04/12/ppXGoAs.png)](https://imgse.com/i/ppXGoAs)

## nav 配置

参考 https://vitepress.dev/reference/default-theme-nav#nav

.vitepress/config.ts 中编写如下：

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "我的笔记", link: "/我的笔记/" },
      { text: "前端八股文", link: "/前端八股文/" },
      { text: "常见问题", link: "/常见问题/" },
    ],
  }
})
```

### 自动导入

日后再配

## sidebar 配置

参考 https://vitepress.dev/reference/default-theme-sidebar

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  themeConfig: {
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
  }
})
```

### 自动导入

日后再配

## 代码演示功能

参考 https://github.com/flingyp/vitepress-demo-preview#readme

安装 `@vitepress-demo-preview/component` 和 `@vitepress-demo-preview/plugin`

```shell
npm i @vitepress-demo-preview/component @vitepress-demo-preview/plugin
```

在 .vitepress/theme/index.ts 中

```typescript
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";

import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

export default {
  enhanceApp({ app, router, siteData }) {
    // app.component("repl-preview", replTemplate(renderRepl));
    app.component("demo-preview", ElementPlusContainer);
  },
};
```

在 .vitepress/config.ts 中引入插件

```typescript
import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
})
```

在 markdown 中使用如下：

```markdown
<preview path="../components/render-demo.vue" title="render 函数的基本使用" description="注意⚠️: setup 语法糖中不支持 render"></preview>
```

展示效果

[![ppXt9l6.png](https://s1.ax1x.com/2023/04/12/ppXt9l6.png)](https://imgse.com/i/ppXt9l6)

### @vue/repl

通过 Vue 官方的 @vue/repl 也可以实现代码演示交互的效果，但是在打包过程中出现了不兼容的问题，有时间的时候再次可以尝试一下。

## 搜索功能

官方搜索实现为 [algolia](https://www.algolia.com/) ，由于搜索有限制所以使用了 [vitepress-plugin-search](https://github.com/emersonbottero/vitepress-plugin-search) 和 [flexsearch](https://github.com/nextapps-de/flexsearch) ，如果想使用 algolia 请自行搜索文档注册使用。

### 安装 flexsearch 和 vitepress-plugin-search

```shell
npm i vitepress-plugin-search flexsearch -D
```

### 配置 config.ts

```typescript
import { defineConfig } from "vitepress";
import { SearchPlugin } from "vitepress-plugin-search";

export default defineConfig({
  vite: {
    plugins: [
      SearchPlugin({
        // 解决中文搜索失效问题
        tokenize: "forward",
        previewLength: 62,
        buttonLabel: "搜索",
        placeholder: "搜索文档",
        allow: [],
        ignore: [],
      }),
    ],
  },
})
```

## 自动部署及 ico 引用

docs 同级目录下创建 deploy.sh 脚本

```sh
set -e

npm run docs:build

cd docs/.vitepress
cp public/* dist
cd -
cd docs/.vitepress/dist

git init
git add -A
git commit -m '自动构建发布'
git push -f git地址 master:pages

cd -
```

以上代码实现了打包后将 dist 目录初始化 git 仓库后提交到指定分支，最后通过 github pages 自动发布

### ico 的引用

我找了很多文档得到了两个 ico 的引用方式

- 将 ico 放到 oss/其他可访问的网络地址
- 通过 deploy.sh 脚本在打包后复制 public 文件夹下的内容到 dist 目录中（本文所用方式）

## config.ts

```typescript
import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { SearchPlugin } from "vitepress-plugin-search";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "YuHao's Blog",
  description: "跟上时代的脚步🦶，卷起来",
  appearance: "dark",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
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

```

## theme.ts

```typescript
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";
import replTemplate from "../utils/repl-template";

import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // app.component("repl-preview", replTemplate(renderRepl));
    app.component("demo-preview", ElementPlusContainer);
  },
};

```

## 项目地址

项目放到了 [yhyjx](https://github.com/yhyjx/yhyjx.github.io) 上，欢迎 mark 🌟。