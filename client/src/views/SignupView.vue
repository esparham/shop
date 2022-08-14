<template>
  <section class="contents">
    <div class="form">
      <h1 class="row center">Signup</h1>
      <form v-on:keyup.enter="signup">
        <label class="label row" for="loginName">User name</label>
        <input type="text" class="row" id="loginName" v-model="loginName">
        <label class="label row" for="password">Password</label>
        <input type="password" class="row" id="password" v-model="password">
        <a href="#" class="searchBtn row" @click.prevent="signup">Signup</a>
      </form>
    </div>
  </section>
</template>

<script>
import config from '../../config.json';
export default {
  data() {
    return {
      loginName: '',
      password: '',
    }
  },
  methods: {
    async signup() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL || config.api}user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ loginName: this.loginName, password: this.password })
        });
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Failed to fetch data.'
          );
          throw error;
        }
        this.$store.dispatch('showNotification', { showNotification: true, notificationContent: 'successfully registered.' });
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 1px solid #747474;
  max-width: 500px;
  text-align: center;
}

h1 {
  font-size: 32px;
  padding: 16px 48px;
  background: #f8f7f5;
}

input {
  border-bottom: 1px solid #747474;
  font-size: 20px;
  margin: 8px;
}

.label {
  font-size: 20px;
}

.row {
  display: block;
  margin: auto;
  margin: 16px auto;
}

.searchBtn {
  width: 33.33%;
  display: block;
  color: #fff;
  background: #ff2b1d;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
</style>