<template>
  <HeaderComponent @showModal="showFilterModal = true" :showHeader="showHeader"></HeaderComponent>
  <router-view />
  <teleport to="body">
    <NotificationComponent :showNotification="notification.show" :content="notification.content" />
  </teleport>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '@/components/Header.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';

export default {
  data() {
    return {
      showHeader: true,
    }
  },
  components: {
    HeaderComponent,
    NotificationComponent,
  },
  computed: {
    ...mapGetters(['notification'])
  },
  mounted() {
    this.$store.dispatch('initBasket');
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.dispatch('login', { token });
    }

    const self = this;
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        self.showHeader = false;
      } else {
        self.showHeader = true;
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }, false);
  },
}
</script>