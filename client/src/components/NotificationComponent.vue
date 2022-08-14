<template>
  <div class="notification" :class="{ 'notify': showNotification }">
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'NotificationComponent',
  props: ['showNotification', 'content'],
  data() {
    return {
    }
  },
  methods: {
    handleHidNotification() {
      this.$emit('hideModal');
    }
  },
}
</script>

<style lang="scss">
.notification {
  z-index: 10;
  max-width: 400px;
  height: 80px;
  background-color: rgb(247, 248, 245);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 20px;
  display: none;
}

.notify {
  display: block;
}

p {
  font-size: 16px;
}
</style>