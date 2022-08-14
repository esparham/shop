<template>
  <section class="contents">
    <div class="form">
      <h1 class="row center">Login</h1>
      <form v-on:keyup.enter="login">
        <label class="label row" for="loginName">User name</label>
        <input type="text" class="row" id="loginName" v-model="loginName">
        <label class="label row" for="password">Password</label>
        <input type="password" class="row" id="password" v-model="password">
        <a href="#" class="searchBtn row" @click.prevent="login">Login</a>
      </form>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'LoginView',
  components: {

  },
  data() {
    return {
      loginName: '',
      password: '',
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('login', { loginName: this.loginName, password: this.password });
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
