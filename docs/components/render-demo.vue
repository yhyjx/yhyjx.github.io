<template>
  <myRender />
</template>

<script setup lang="ts">
import { h, ref, useSlots } from "vue";

const slots = useSlots();
const content = ref("");
const list = ref([1, 2, 3, 4, 5, 7, 8]);
const bolMark = ref(false);
const myRender = () =>
  h("div", { class: "my-render" }, [
    h("h1", null, "render、h 函数的使用"),
    h("ul", null, [list.value.map((vnode) => h("li", { key: vnode }, vnode))]),
    bolMark.value
      ? h("p", null, "✅ 正确的展示")
      : h("p", null, "❌ 错误的展示"),
    h("button", { onClick: () => (bolMark.value = !bolMark.value) }, "切换"),
    h("input", {
      vModel: content.value,
      type: "text",
      placeholder: "请输入内容",
      onInput: () => list.value.push(Math.floor(Math.random() * 10)),
    }),
    slots.default ? slots.default() : h("p", null, "默认 slot"),
  ]);
</script>
