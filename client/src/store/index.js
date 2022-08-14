import { createStore } from 'vuex';
import config from '../../config.json';
import addToLocalStorage from '../Utils/localStorageHelper';
import router from '../router';

export default createStore({
  state: {
    user: null,
    products: [],
    basket: [],
    paymentStatus: null,
    showNotification: false,
    notificationContent: '',
  },
  getters: {
    products(state) {
      return state.products;
    },
    basket(state) {
      return state.basket;
    },
    notification(state) {
      return { show: state.showNotification, content: state.notificationContent };
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },
    addToBasket(state, payload) {
      const exist = state.basket.find(item => item.id === payload.product.id);
      if (!exist) {
        state.basket.push({ ...payload.product, qty: payload.qty });
        addToLocalStorage({ ...payload.product, qty: payload.qty });
        this.dispatch('showNotification', { showNotification: true, notificationContent: `${payload.product.name} added to basket.` });
      } else {
        // exist.qty++;
        this.dispatch('showNotification', { showNotification: true, notificationContent: 'Item already exist in your basket.' });
      }
    },
    initBasket(state, payload) {
      state.basket = payload;
    },
    pay(state, payload) {
      state.paymentStatus = payload.response;
      state.basket = [];
    },
    showNotification(state, payload) {
      state.showNotification = payload.showNotification;
      state.notificationContent = payload.notificationContent;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    async showNotification(context, data) {
      context.commit('showNotification', data);
      setTimeout(function () {
        context.commit('showNotification', { showNotification: false, notificationContent: '' });
      }, 3000);
    },
    async pay(context, data) {
      const token = localStorage.getItem('token');
      let basketItems = data.map(item => ({ id: item.id, qty: item.qty }))
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL || config.api}product/pay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(basketItems)
        });
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Failed to fetch data.'
          );
          throw error;
        }
        context.commit('pay', {
          response: responseData,
        });
        localStorage.removeItem('basket');
      } catch (error) {
        this.dispatch('showNotification', { showNotification: true, notificationContent: error });
      }
    },

    async search(context, data) {
      const { searchTerm, searchCategory } = data;
      let url;
      if (searchTerm === '') {
        url = `${process.env.VUE_APP_API_BASE_URL || config.api}product/category/${searchCategory}`;
      } else {
        url = `${process.env.VUE_APP_API_BASE_URL || config.api}product/name/${searchTerm}/${searchCategory}`;
      }
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          context.commit('setProducts', {
            products: [],
          });
          const error = new Error(
            responseData.message || 'Failed to fetch data.'
          );
          throw error;
        }
        context.commit('setProducts', {
          products: responseData,
        });
      } catch (error) {
        this.dispatch('showNotification', { showNotification: true, notificationContent: error });
      }
    },

    initBasket(context) {
      let basket = localStorage.getItem('basket');
      if (!basket) return;
      basket = JSON.parse(basket);
      context.commit('initBasket', basket);
    },

    async getInitialProducts(context) {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL || config.api}product/randomProducts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Failed to fetch data.'
          );
          throw error;
        }
        context.commit('setProducts', {
          products: responseData,
        });
      } catch (error) {
        this.dispatch('showNotification', { showNotification: true, notificationContent: error });
      }
    },

    addToBasket(context, data) {
      context.commit('addToBasket', data);
    },

    async login(context, data) {
      let showNotification = true;
      if (data.token) {
        showNotification = false;
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL || config.api}user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (!response.ok) {
          localStorage.removeItem('token');
          const error = new Error(responseData.message || 'Failed to fetch data.');
          throw error;
        }
        context.commit('setUser', { user: responseData, });
        localStorage.setItem('token', responseData.token);
        showNotification && this.dispatch('showNotification', { showNotification: true, notificationContent: 'Successfully logged in.' });
        router.push('/');
      } catch (error) {
        localStorage.removeItem('token');
        this.dispatch('showNotification', { showNotification: true, notificationContent: error });
      }
    },
    logout(context) {
      context.commit('logout');
      this.dispatch('showNotification', { showNotification: true, notificationContent: 'You are logged out.' });
    }
  },
  modules: {
  }
})