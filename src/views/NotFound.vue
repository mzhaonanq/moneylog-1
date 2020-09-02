
<template>
  <div>
    <div class="text-wrapper">当前页面不存在，请检查网址是否正确</div>
    <div class="button-wrapper">
      <router-link to="/" >
      <Button class="backhome" >返回首页</Button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
export default {
  name: "NotFound",
  components:{
    Button,
  }
};
</script>

<style lang="scss" scoped>
.text-wrapper{
  text-align: center;
}
.button-wrapper {
  text-align: center;
  margin-top: 200px;
}
</style>