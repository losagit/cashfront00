<template>
  <v-container>
    <div class="products">
      <SingleProduct
        v-for="(product, i) in products"
        :key="i"
        :product="product"
      />
    </div>
  </v-container>  
</template>

<script>
import SingleProduct from "./SingleProduct.vue";
export default {
  props: {
    title: {
      type: String,
    },
    products: {
      type: Array,
    },
  },

  components: {
    SingleProduct,
  },

  created() {
    console.warn(this.products);
  },
};
</script>

<style scoped>
.catagory-products {
  margin-bottom: 100px;
}
.catagory-products .btn {
  height: 48px;
  background: #f8f8f8;
  border: 2px solid #f8f8f8;
  width: 100%;
  margin-top: 18px;
}
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
}
@media (max-width: 969px) {
  .products {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 400px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
