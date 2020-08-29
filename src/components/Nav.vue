<template>
  <nav>
    <router-link to="/labels" class="item">
      <Icons name="labels" />
      标签
    </router-link>
    <router-link to="/money" class="item">
      <Icons name="money" />
      记账
    </router-link>
    <router-link to="/statistics" class="item">
      <Icons name="statistics" />
      数据
    </router-link>
  </nav>
</template>
<script lang="ts">
import x from "@/assets/icons/money.svg";
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.25);
  font-size: 12px;
  .item {
    padding: 2px 0;
    width: 33.333333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
}
.router-link-active {
  color: red;
}
</style>
