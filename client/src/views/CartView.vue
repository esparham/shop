<template>
  <section class="contents">
    <div class="center" v-if="basket.length === 0">
      <h1>No item in the basket</h1>
    </div>
    <div class="center" v-if="basket.length !== 0">
      <li class="listItem" v-for="product of basket" :key="product.id">
        <figure class="row">
          <a class="imageHolder">
            <img :src="product.image" :alt="product.name" />
          </a>
          <div class="prDetail" style="flex-grow: 3">
            <strong>
              {{ product.name }}
            </strong>
            <p>
              {{ product.type }}
            </p>
            <span class="prPrice">Unit price: {{ product.price }}€</span>
            <p>
              Quantity: {{ product.qty }}
            </p>
            <p>
              Total Price: {{ product.qty * product.price }}
            </p>
            <!-- <p>
              {{ product.description }}
            </p> -->
          </div>
        </figure>
      </li>
      <a href="#" class="searchBtn" @click.prevent="pay">Pay</a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CartView',
  data() {
    return {
    }
  },
  components: {
  },
  methods: {
    pay() {
      this.$store.dispatch('pay', this.basket);
      this.$router.push('/');
      this.$store.dispatch('showNotification', { showNotification: true, notificationContent: 'Your payment was successfull.' })
    }
  },
  computed: {
    ...mapGetters(['basket']),
  },
}
</script>

<style lang="scss" scoped>
.searchBtn {
  margin: auto;
}

.imageHolder {
  padding: 8px 32px;
  width: 150px;
  text-align: center;
}

li {
  list-style: none;
}

.listItem {
  width: 80%;
  margin: auto;
}

img {
  width: 150px;
}

.prDetail {
  max-width: 700px;
  padding: 8px;
  box-shadow: 0 0 8px 0 rgb(26 27 27 / 10%);
  margin-left: 32px;
}

.prPrice {
  display: block;
  font-size: 18px;
  padding-bottom: 10px;
}

.prDetail strong {
  display: block;
  line-height: 25px;
  height: 25px;
  font-size: 15px;
  margin-bottom: 5px;
}
</style>