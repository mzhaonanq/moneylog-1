<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <Icons name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import Icons from "@/components/Icons.vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";
tagListModel.fetch();
@Component({
  components: {
    Layout,
  },
})
export default class Labels extends Vue {
  tags = tagListModel.data;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const result = tagListModel.create(name);
      if(result==='duplicated'){
        window.alert('重复啦 ')
      }else if(result==='success'){
        window.alert('添加成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  margin-right: 16px;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
