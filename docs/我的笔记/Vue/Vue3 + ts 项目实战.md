# Vue3 + ts 项目实战

项目通过 vue-cli 搭建

## 一、 代码规范

严格要求代码规范，保持代码整洁

### 1.1 配置 editorconfig 

多人开发项目时，保持一致的编码风格

根目录下创建 `.editorconfig`

```
# 参考 http://editorconfig.org

root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
max_line_length = of
insert_final_newline = true
```

vscode 搭配 EditorConfig for VS Code 插件使用

### 1.2 prettier 工具

`prettier` 是代码格式化工具

1. 安装 prettier

```
npm i prettier -D
```

1. 配置 .prettierrc 

```
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": false,
  "trailingComma": "none",
  "semi": false,
  "endOfLine": "auto"
}
```

1. 配置 .prettierignore

```
/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

1. `vscode` 安装插件 `Prettier - Code formatter`
2. 配置 package.json 中的 prettier 脚本

```
{
  "prettier": "prettier --write ."
}
```

### 1.3 git Husky

在提交代码之前对代码进行检验

1. 安装 husky

```Shell
npm i -D husky
```

1. package.json 中添加 prepare 钩子

```shell
npm pkg set scripts.prepare="husky install"
npm run prepare
```

执行后 package.json 脚本中会有 `"prepare": "husky install"`

1. 执行 `npm run prepare` 生成 .husky 文件夹
2. 生成 .husky/pre-commit 文件，生成后每次提交都会触发 `npm run lint` 检验 

```shell
npx husky add .husky/pre-commit "npm run lint"
git add .husky/pre-commit
```

1. `git add .husky/pre-commit` 将文件添加至远程仓库

### 1.4 lint-staged

结合 husky 使用，可以让 husky 的 hook 触发的命令只作用于 git 暂存区的文件，避免了修改一个文件多文件检测的情况

1. 安装 

```shell
npm i -D lint-staged
```

1. 配置 package.json

```javascript
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix"
    ],
    "*.vue": [
      "eslint --fix"
    ],
    "*.{html,vue,vss,sass,less}": [
      "prettier --write"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
}
```

1. 对 pre-commit 进行修改，每次 git commit 前执行新命令 `npx lint-staged`，修改如下

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### 1.5 git commit 规范

代码质量保障的同时，也需要对提交的内容做出规范，目前最流行的规范为 [Angular 团队规范](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fangular%2Fangular.js%2Fblob%2Fmaster%2FDEVELOPERS.md%23commits)

#### 1.5.1 commitizen 使用

commitizen 是一个命令行交互工具，帮助我们编写正确的提交信息格式

1. 安装 commitizen

   ```shell
   npm install -D commitizen
   ```

2. 安装 cz-conventional-changelog ，通过某个规范帮助生成信息，默认 Angular

   ```shell
   npx commitizen init cz-conventional-changelog --save-dev --save-exact
   ```

3. 执行上述命令后会在 package.json 中新增如下代码

   ```javascript
     "config": {
       "commitizen": {
         "path": "./node_modules/cz-conventional-changelog"
       }
     }
   ```

4. 此时我们可以执行 `npx cz` 相当于 commit

#### 1.5.2 commitlint 结合 husky 使用

commitlint 用来校验提交的 message 信息格式，配合 husky hooks 使用

1. 安装 commitlint

   ```shell
   npm install -D @commitlint/{config-conventional,cli}
   ```

2. 配置 commitlint.config.js

   ```shell
   echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
   ```

3. 上面已经添加过 husky 直接添加 husky hooks

   ```shell
   npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
   ```

## 二、第三方库集成

### 2.1 vue.config.js 配置

有以下三种配置方式，详情请看 [vue.config.js 配置指南](https://cli.vuejs.org/zh/config/)

[![pplo9kF.md.png](https://s1.ax1x.com/2023/03/14/pplo9kF.md.png)](https://imgse.com/i/pplo9kF)

### 2.2 vue-router 配置

安装 vue-router

```shell
npm i vue-router @4
```

配置 /router/index.ts

[![pploKte.md.png](https://s1.ax1x.com/2023/03/14/pploKte.md.png)](https://imgse.com/i/pploKte)

`RouteRecordRaw` 为官方源码中的类型，通过 `createRouter`创建路由对象并导出，在 main.ts 中通过插件的方式使用

### 2.3 vuex 配置 (有对 ts 支持更好的 pinia)

安装 vuex

```shell
npm i vuex@next
```

配置 /store/index.ts

[![pployn0.md.png](https://s1.ax1x.com/2023/03/14/pployn0.md.png)](https://imgse.com/i/pployn0)

通过 `createStore`创建 store 对象并导出，通过插件形式引入

### 2.4 element-plus 

此处使用 `element-plus `自动引入 [官方链接](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

安装element-plus

```shell
npm i element-plus
```

安装自动导入插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

配置 vue.config.js ，其他脚手架工具自行翻阅文档

```javascript
const { defineConfig } = require("@vue/cli-service")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
const AutoImportElementCss = require("unplugin-element-plus/webpack")
const path = require("path")

module.exports = defineConfig({
  outputDir: "./dist",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        cm: "@/components"
      }
    },
    plugins: [
      AutoImportElementCss({}),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
})

```

> 使用自动导入后，如果通过 ElMessage、Elloading 等形式使用会出现样式丢失问题通过安装 `unplugin-element-plus`解决，配置中 webpack 使用 unplugin-element-plus/webpack ，vite 使用 unplugin-element-plus/vite 在各配置的 plugins 中引入，会帮助我们自动导入 element-plus 的样式，上面代码块中已经使用

### 2.5 axios 封装

在游览器中创建 `XMLHttpRequests` ，在 `node.js`中创建 http 

安装 axios

```shell
npm i axios@0.21.1
```

定义 src/service/request.ts

[![pp3CVpR.md.png](https://s1.ax1x.com/2023/03/15/pp3CVpR.md.png)](https://imgse.com/i/pp3CVpR)

定义 src/service/type.ts

[![pp3CM7D.md.png](https://s1.ax1x.com/2023/03/15/pp3CM7D.md.png)](https://imgse.com/i/pp3CM7D)

定义 src/service/index.ts

[![pp3ClAe.md.png](https://s1.ax1x.com/2023/03/15/pp3ClAe.md.png)](https://imgse.com/i/pp3ClAe)

实现注册全局使用 (舍弃，封装 api 后哪里用到掉用哪里)

```typescript
import type { App } from "vue"
import myAxios from "@/service"
// import { get, post } from "@/request/methods.instance"

export default function (app: App) {
  app.config.globalProperties.$http = myAxios
}
```

### 2.6 样式重置

安装 normalize.css

```shell
npm i normalize.css
```

在 main.ts 中引入

```typescript
import 'normalize.css'
```

### 2.7 sass的使用及全局变量的装载

安装 sass/sass-loader 即可在组件中使用 sass

```Shell
npm i sass sass-loader -D
```

安装 style-resources-loader 全局装载 sass 变量

```shell
vue add style-resources-loader
```

vue.config.js 配置如下 (less 等同理)

```javascript
pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.join(__dirname, "./src/assets/styles/index.scss")]
    }
  },
```

### 2.8 pinia 的使用

安装 pinia

```Shell
npm i pinia
```

通过 defineStore 创建模块，变量就是 state、computed 是 getter、函数为 action

```typescript
import { defineStore } from "pinia"
import { ref } from "vue"

const useGlobalStore = defineStore("global", () => {
  const toogle = ref(false)
  const changeToogle = () => {
    toogle.value = !toogle.value
  }

  return {
    toogle,
    changeToogle
  }
})

export default useGlobalStore
```

在总 store 入口引入并导出 pinia 及注册函数供 main.ts 使用

```typescript
import { createPinia } from "pinia"
import piniaPluginPersist from 'pinia-plugin-persist'

export default createPinia().use(piniaPluginPersist)
```

main.ts 中通过 use() 安装 pinia 

**pinia 持久化**

安装 pinia-plugin-persist

```Shell
npm i pinia-plugin-persist
```

在 store 入口使用 pinia.use(piniaPluginPersist)

在模块中使用 defineStore 创建模块时可传入 

```typescript
presist: {
  enabled: true,
    strategies: [
      {
        // 指定需要缓存的 key
        path: [],
        // 指定存储 session/local
        storage: sessionStorage
      },
      {
        path: [],
        storage: localStorage
      }
    ]
}
```

### 2.9 api 封装及自动导入

自动导入 api ，由于无法进行类型推导暂时舍弃

```typescript
const files = require.context("@/api/modules/", true, /\.ts$/)
interface IModules {
  [key: string]: any
}
const moduleApis: IModules = {}

files.keys().forEach((path) => {
  const value = files(path)
  const data = value.default
  const key = path.replace(/(\.\/|\.ts)/g, "")
  if (!data) return
  moduleApis[key] = data
})

export {IModules,moduleApis}
```

封装 user.ts

```typescript
import myAxios from "@/service"
import { returnRealPath } from "@/utils/public"

const prefix = "/user/"

const userApi = {
  login<T>(url: string, params?: object, config?: object) {
    return myAxios.post<T>(returnRealPath(prefix, url), params, config)
  },
  getUserList<T>(url: string, config?: object) {
    return myAxios.get<T>(returnRealPath(prefix, url), config)
  }
}

export default userApi
```

Api 主入口依次导入模块 api

```typescript
import user from "./modules/user"

interface IModules {
  user: typeof user
}
const moduleApis: IModules = {
  user
}
export { IModules, moduleApis }
```

实现辅助函数注册全局 global 属性

```typescript
import { App } from "vue"
import { moduleApis } from "@/api"
import { mainStore } from "@/store"
import myAxios from "@/service"
import { ElMessage } from "element-plus"

export default function (app: App) {
  app.config.globalProperties.$api = moduleApis
  app.config.globalProperties.$mainStore = mainStore
  app.config.globalProperties.$myAxios = myAxios
  app.config.globalProperties.$message = ElMessage
}
```

定义 src/globalPro.d.ts 声明 type

```typescript
import { ComponentCustomProperties } from "@vue/runtime-core"
import { IModules } from "@/api"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: IModules
  }
}

export default ComponentCustomProperties
```

### 2.10 echarts 的使用

安装 `echarts`

```Shell
npm i echarts
```



## 三、公共组件搭建

### 3.1 动态路由实现

### 3.2 layout 布局实现

### 3.3 Icon 自动导入

安装 `@iconify/vue`

```Shell
npm i -D @iconify/vue
```

组件内使用通过

```Vue
<template>
  <Icon icon="ep:opportunity"/>
  <Icon
      width="18"
      class="slider-icon-class"
      :icon="item.icon ? item.icon : 'ep:chrome-filled'"
   ></Icon>
</template>

<script setup>
  import { Icon } from "@iconify/vue"
</script>
```

> 通过该[图标库](https://iconify.design/)选择想要的 icon，作为 el-butoon 的图标使用时需要借助 slot

### 3.4 表单可配置组件

### 3.5 表格可配置组件

### 3.6 动态主题实现

### 3.7 国际化方案实现

### 3.8 mitt 通讯

### 3.9 全局 loading 站位实现