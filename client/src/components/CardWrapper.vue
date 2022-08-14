<template>
  <ul class="productList">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'CardWrapper',
}
</script>

<style lang="scss">
.productList {
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
}
</style>