<template>
  <v-container fluid class="ma-2">
    <v-col cols="12">
      <v-card color="#f5f5f5">
        <v-card-actions>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="grey light-2"
            grow
          >
            <v-tab @click="getData()"> Todos </v-tab>
            <v-tab
              v-model="categoria_id"
              v-for="item in categorias"
              :key="item.nombre"
              @click="getProducts(item.id)"
            >
              {{ item.nombre }}
            </v-tab>
          </v-tabs>
        </v-card-actions>
      </v-card>

      <v-toolbar class="mt-6" flat color="transparent">
        <v-row align="center">
          <v-col cols="10">
            <v-toolbar-title>Todos los productos</v-toolbar-title>
          </v-col>
          <v-col cols="2" align-self="center">
              <v-select v-model="genero" dense outlined :items="generos" item-text="label" item-value="value" label="Para quien..." @change="getProductsParam()" />
          </v-col>
        </v-row>
        </v-toolbar>
      <v-card color="transparent" flat width="100%" class="mt-1" >
        <catagory-products :products="productos" />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import Filters from "@/components/website/Filters.vue";
import CatagoryProducts from "@/components/website/CatagoryProducts.vue";
import SingleProduct from "@/components/website/SingleProduct.vue";

export default {
  components: {
    Filters,
    SingleProduct,
    CatagoryProducts,
  },

  data() {
    return {
      productos: [],
      categorias: [],
      categoria_id: null,
      genero: null,
      tab: "polos",
      generos: [
        {
          label:"Ambos",
          value: null
        },
        {
          label:"Caballeros",
          value:"m"
        },
        {
          label:"Damas",
          value:"f"
        },
      ],
      
    };
  },
  computed: {},

  watch: {},

  methods: {
    bytesToBase64(bytes) {
      return btoa(
        new Uint8Array(bytes).reduce(
          (datos, byte) => datos + String.fromCharCode(byte),
          ""
        )
      );
    },

    async getCategorias() {
      const data = await this.$store.dispatch("categorias/list");
      this.categorias = data;
    },

    async getData() {
      const data = await this.$store.dispatch("productos/all");

      const prods = data.map((e) => ({
        id: e.id,
        img: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
        sale: true,
        name: e.nombre,
        price: e.precio,
      }));
      this.productos = prods;
    },

    async getProducts(categoria_id) {

      this.categoria_id = categoria_id;

      const data = await this.$store.dispatch("productos/list", categoria_id);
      const prods = data.map((e) => ({
        id: e.id,
        img: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
        sale: true,
        name: e.nombre,
        price: e.precio,
      }));
      this.productos = prods;
    },

    async getProductsParam(){

      const params = {};
      if(this.categoria_id != null) params.categoria_id = this.categoria_id;
      if(this.genero != null) params.genero = this.genero;
      
      const data = await this.$store.dispatch("productos/listParams", params);
      const prods = data.map((e) => ({
        id: e.id,
        img: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
        sale: true,
        name: e.nombre,
        price: e.precio,
      }));
      this.productos = prods;
    }
  },

  async created() {
    this.getData();
    this.getCategorias();
  },
};
</script>

<style scoped>
.border {
  margin: 0px 8px;
  background: #f5f5f5;
  border-radius: 10px;
  text-decoration: none;
  width: 10px;
  height: 10px;
}
.v-list-item-group .v-list-item--active {
  color: #000000;
}
.v-list-item__content {
  padding: 1px;
}
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>