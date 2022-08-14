<template>
  <div class="headerHolder">
    <header :class="showHeaderHandler">
      <div class="center">
        <div class="logo">
          <router-link to="/"><img src="logo.svg" alt="RoastMarket" /></router-link>
          <ul class="row">
            <router-link v-if="loggedin" to="/" class="link">Welcome {{ user.userName }}</router-link>
            <router-link to="/cart" class="link">Cart</router-link>
            <router-link v-if="!loggedin" to="/login" class="link">Login</router-link>
            <router-link v-if="!loggedin" to="/signup" class="link">Signup</router-link>
            <router-link v-if="loggedin" to="/logout" class="link">Logout</router-link>
          </ul>
        </div>
        <div class="headContent">
          <div class="catName">
            <h1>Game, Music, &amp; Books!</h1>
          </div>
          <div class="searchPane">
            <input class="searchTerm" type="text" v-model="searchTerm" @keyup.enter="search"
              placeholder="what are you looking for?">
            <select class="filterDdl" v-model="searchCategory">
              <option v-for="category of categories" :key="category">{{ category }}</option>
            </select>
            <a href="#" class="searchBtn" @click.prevent="search">Search</a>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderView',
  data() {
    return {
      searchTerm: '',
      categories: ['all', 'game', 'music', 'book'],
      searchCategory: 'all',
    }
  },
  props: ['showHeader'],
  computed: {
    ...mapGetters(['user']),
    showHeaderHandler() {
      return this.showHeader ? 'fixedHeader' : 'floadHeader'
    },
    loggedin() {
      return this.user && this.user.status === 'success';
    }
  },
  methods: {
    search() {
      this.$store.dispatch('search', { searchTerm: this.searchTerm, searchCategory: this.searchCategory });
    }
  }
}
</script>

<style lang="scss">
.row li {
  padding: 20px;
}

.headerHolder {
  height: 160px;
}

header {
  background: #f8f7f5;
  border-bottom: 1px solid #e8e8e7;
  transition: 0.3s;
}

.logo {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.logo img {
  height: 45px;
  width: auto;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.catName {
  padding: 8px 8px;
  font-size: 23px;
  line-height: 30px;
  font-weight: bold;
}

.searchPane {
  display: flex;
  grid-gap: 10px;
  padding: 8px;
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

.searchTerm {
  width: 33.33%;
  display: block;
  border-bottom: 1px solid #747474;
  height: 45px;
  background-color: #f8f7f5;
  line-height: 45px;
  text-align: center;
}

.filterDdl {
  width: 33.33%;
  display: block;
  height: 44px;
  border: none;
  text-align: center;
  border-bottom: 1px solid #747474;
  background: none;
}

.link {
  padding: 8px 16px;
}
</style>