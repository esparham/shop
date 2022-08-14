<template>
  <section class="contents">
    <div class="center">
      <div class="resultNum">{{ artikels }}</div>
      <CardWrapper>
        <p v-show="!foundItems">No item</p>
        <ProductCard v-show="foundItems" v-for="product of products.items" :key="product.id" :product="product">
        </ProductCard>
      </CardWrapper>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';
import CardWrapper from '@/components/CardWrapper';

export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  components: {
    ProductCard,
    CardWrapper,
  },
  computed: {
    ...mapGetters(['products']),
    artikels: function () {
      if (this.products.count && this.products.count > 0) {
        const productsLength = this.products.count;
        return `${productsLength} ${productsLength > 1 ? 'Items' : 'Item'}`;
      }
      return 'No item found!';
    },
    foundItems: function () {
      return this.products.count !== 0;
    }
  },
  async created() {
    await this.$store.dispatch('getInitialProducts');
  },
}
</script>

<styles lang="scss">
.contents {
  padding: 20px 0;
}

.resultNum {
  padding: 8px;
  font-size: 17px;
  color: #747474;
}
</styles>