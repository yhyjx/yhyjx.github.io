---
outline: deep
---

# Vue

## 一、Vue3 源码解析

### 1、Vue 做了什么

网页的显示是由许多 DOM 构建的，传统的数据更新是需要通过 JavaScript 对 DOM 进行一些更新操作，但是当大量 DOM 需要更新时效率会明显变慢。此时 Vue 提供了虚拟 DOM（VNode）以便我们对数据进行修改，最终 Vue 会将虚拟 DOM 转换为真实 DOM 渲染。

> 虚拟 DOM 其实就是一个对象，对应了真实 DOM

- Vue 基于模版创建了一个 **渲染函数（render）**，内部调用 **h 函数** 返回了一个 **VNode 虚拟节点**，最终渲染函数将这个虚拟节点返回
- Vue 会将虚拟节点转换为真实 DOM，然后渲染
- 当组件更新时，Vue 会再次调用 render 函数返回一个 VNode，Vue 会将新旧节点进行比对，最终以最高效的方式渲染

[![返回 VNode 并渲染](https://s1.ax1x.com/2023/04/06/ppI2mKf.md.png)](https://imgse.com/i/ppI2mKf)

[![组件更新时进行对比（diff算法）](https://s1.ax1x.com/2023/04/06/ppI2UqU.md.png)](https://imgse.com/i/ppI2UqU)

### 2、Vue 三大核心模块

Vue 的三大核心模块，如下：

- Reactivity Module
- Compiler Module
- Renderer Module

#### 2.1 响应式模块

创建响应式对象，并且观察其变化，当使用这些对象的代码运行时，会被跟踪，如果响应式对象发生变化，他们也会随之改变。

#### 2.2 编译器模块

将模版编译为渲染函数，可能在游览器运行时产生，但在构建 Vue 项目时更常见，这样游览器就只需要接受渲染函数。

#### 2.3 渲染模块

渲染模块包含了三个阶段，如下：

- **Render Phase （渲染阶段）**：调用 render 函数返回一个 VNode
- **Mount Phase（挂载阶段）**：通过 mount 函数将 VNode 通过 DOM API 创建网页
- **Patch Phase（补丁阶段）**：将修旧节点放入 patch 函数进行比较，只更新变化的部分

[![渲染模块的三个阶段](https://s1.ax1x.com/2023/04/06/pponlJP.md.png)](https://imgse.com/i/pponlJP)

> 白话表述：
>
> - 模版(template、html)通过编译器转换为 render 函数
> - 响应式模块初始化响应对象
> - 渲染模块调用 render 函数，此时 render 函数引用的响应式对象已经被监听，render 函数通过执行内部的 h 函数返回了一个 VNode
> - 挂载阶段调用了 mount 函数通过 VNode 创建页面
> - 当响应式对象发生变化，会再次触发渲染器中的 render 函数返回新的 VNode，将新旧 VNode 放入 patch 函数中进行比较后根据需要更新内容

### 3、render 函数

在大部分情况下通常使用 template 模版进行编写代码，但是如果想要做出一些可控的逻辑需要使用 render 函数。

#### 3.1 2.x 和 3.x 版本的区别

2.x

```javascript
render(h){
  return h('h1',{
    attrs: {
      id: 'firstH1'
    },
    on: {
      click: this.onClick
    }
  },'hello')
}
```

3.x

```javascript
import {h} from 'vue'
render(){
  return h('h1',{
    id: 'firstH1',
    onClick: this.onClick
  },'hello')
}
```

- 2.x 版本 VNode 的属性和方法都需要单独列出
- **3.x 版本直接都放入一个扁平化对象中，会将其中的 key 逐一检查，如果 key 在原生 DOM 中作为属性则直接赋值给它的 property，否则作为属性赋值给它的 attrs**
- 3.x 版本 h 函数是直接从 Vue 本身导出的

#### 3.2 render 函数的基本使用

<preview path="../components/render-demo.vue" title="render 函数的基本使用" description="注意⚠️: setup 语法糖中不支持 render"></preview>

### 4、编译器
