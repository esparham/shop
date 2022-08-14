<template>
  <li class="listItem">
    <figure>
      <a>
        <img :src="product.image" :alt="product.name" />
      </a>
    </figure>
    <div class="prDetail">
      <div class="actions">
        <input type="number" v-model="qty">
        <button @click="addToBasket">+</button>
      </div>
      <span class="prPrice">{{ product.price }}€</span>
      <strong>
        {{ product.name }}
      </strong>
      <p>
        {{ product.type }}
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  data() {
    return {
      qty: 1
    }
  },
  computed: {
  },
  methods: {
    addToBasket() {
      this.$store.dispatch('addToBasket', { product: this.product, qty: this.qty });
    }
  }
}
</script>

<style lang="scss">
figure {
  padding-bottom: 24px;
}

.listItem {
  border: 1px solid #f8f7f5;
  // box-shadow: 5px 5px 12px 1px rgba(0, 0, 0, 0.84)
}

.actions {
  position: absolute;
  top: -20px;
  right: 10px;

  button {
    border: none;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: rgb(235, 66, 48);
    color: white;
    cursor: pointer;
  }

  input {
    height: 50px;
    width: 50px;
    border: 1px solid #747474;
    border-radius: 50%;
    color: rgb(235, 66, 48);
    text-align: center;
  }
}

.prDetail {
  position: relative;
  background: #f8f7f5;
}

li {
  width: 50%;
  padding: 8px;
}

li figure a {
  display: block;
  position: relative;
  padding-top: 80%;
}

li figure img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
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