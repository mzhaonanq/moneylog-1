<template>
  <div class="container" :class="{[classPrefix + '-wrapper']: classPrefix}">
    <div class="content" :class="{[classPrefix + '-content']:classPrefix}">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
  props: ['classPrefix'],
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>
