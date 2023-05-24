<template>
  <div class="works-display">
    <div
      class="work-list"
      v-for="item in works"
      :key="item.name"
      @click="toWorksView(item.url)"
    >
      <img :src="item.imgUrl" />
      <div class="work-desc">
        <h3>{{ item.name }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const works = [
  {
    name: "静态资源管理",
    desc: "借助 githubPages 进行一些轻量资源管理，提供外链下载。",
    url: "https://yhyjx.github.io/my-assets/",
    imgUrl:
      "https://img-blog.csdnimg.cn/20210205171201975.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Rlbmc4NzIzNDczNDg=,size_16,color_FFFFFF,t_70#pic_center",
  },
  {
    name: "vue3脚手架",
    desc: "借助 vue3 + ts 搭建的简易系统脚手架，动态菜单、axios 封装、pinia封装、api封装的都已实现。",
    url: "https://github.com/yhyjx/vue3-ts-node/",
    imgUrl:
      "https://img-blog.csdnimg.cn/20210205171201975.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Rlbmc4NzIzNDczNDg=,size_16,color_FFFFFF,t_70#pic_center",
  },
];

const toWorksView = (url) => {
  window.open(url);
};
</script>

<style>
.works-display {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}
.work-list {
  flex: 0 0 33.33%;
  height: 200px;
}
</style>
