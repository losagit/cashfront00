<template>
  <v-card flat class="pa-2" color="#f5f5f5">
    <div class="single-product">
      <div class="img-container">
        <img :src="product.img" width="100%" />
        <div v-if="product.sale" class="sale">-50%</div>
      </div>
      <div class="product-content">
        <h6 class="name">
          {{ product.name }}
        </h6>
        <div class="rating">
          <span class="price"> S/. {{ product.price }} </span>
          <v-btn
            dark
            small
            color="orange"
            outlined
            :to="{
              name: 'detail',
              params: { id: product.id },
            }"
          >
            <v-icon dense>mdi-eye</v-icon> ver</v-btn
          >
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.single-product .img-container {
  position: relative;
}
.single-product .img-container .sale {
  position: absolute;
  top: 0;
  left: 0;
  padding: 9px;
  background: #e91e63;
  right: auto;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;

  /* white */

  color: #ffffff;
}
.single-product .product-content {
  padding: 0px 0px;
}
.single-product .product-content h6 {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  opacity: 0.6;
}
.single-product .product-content .rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
.single-product .rating .price {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
}
</style>
