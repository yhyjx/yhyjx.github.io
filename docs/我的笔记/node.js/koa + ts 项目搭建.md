# ts + node 后台服务搭建

该项目基于 node.js + koa + koa-router + ts 搭建

## 一、初始化 tsconfig.json

安装 typescript ，如果有跳过

```shell
npm i -g typescript
```

执行命令 `tsc --init` 进行初始化

## 二、npm init 初始化

执行`npm init`初始化项目

## 三、安装 @types/node

```shell
npm i -D @types/node
```

安装后可以使用 require/import 等导入本地/第三方包

## 四、使用 koa

安装 koa / @types/koa

```shell
npm i koa @types/koa
```

创建 main.ts 文件并使用 koa

```typescript
const Koa = require("koa");
const app = new Koa();
```

## 五、使用 koa-router

安装 koa-router / @types/koa-router

```shell
npm i koa-router @types/koa-router
```

封装 router

[![pp1wg58.md.png](https://s1.ax1x.com/2023/03/15/pp1wg58.md.png)](https://imgse.com/i/pp1wg58)

mall.router.ts 如下

[![pp1wzrR.md.png](https://s1.ax1x.com/2023/03/15/pp1wzrR.md.png)](https://imgse.com/i/pp1wzrR)

全局文件中挂载所有路由

[![pp10Sq1.md.png](https://s1.ax1x.com/2023/03/15/pp10Sq1.md.png)](https://imgse.com/i/pp10Sq1)
