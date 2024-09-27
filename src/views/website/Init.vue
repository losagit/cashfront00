<template>
  <v-row>
    <v-col cols="9">
      <banner />
      <v-toolbar flat color="transparent">
        <v-divider inset vertical class="mr-2"></v-divider>
        <v-toolbar-title>Nuevos productos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/catalogue" outlined color="warning"> ir a Catalogo</v-btn>
      </v-toolbar>
      <catagory-products :products="productos" />
      <catagory-products :products="productos" />
    </v-col>
    <v-col cols="3">
      <v-card color="#f5f5f5" width="100%">
        <v-img src="../../assets/galeria/ban4.jpg" width="100%"></v-img>
      </v-card>

      <v-card color="#f5f5f5" width="100%" class="my-3">
        <v-img src="../../assets/galeria/ban1.jpg" width="100%"></v-img>
      </v-card>

      <v-card color="#f5f5f5" width="100%">
        <v-img src="../../assets/galeria/ban2.jpg" width="100%"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
  
<script>
import Banner from "@/components/website/Banner.vue";
import CatagoryProducts from "@/components/website/CatagoryProducts.vue";

export default {
  name: "ecom",
  components: {
    Banner,
    CatagoryProducts,
  },
  data() {
    return {
      productos: [],
    };
  },

  methods: {
    bytesToBase64(bytes) {
      return btoa(
        new Uint8Array(bytes).reduce(
          (datos, byte) => datos + String.fromCharCode(byte),
          ""
        )
      );
    },
  },

  async created() {
    const data = await this.$store.dispatch("productos/all");
    const prods = data.map((e) => ({
      id:e.id,
      img: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
      sale: true,
      name: e.nombre,
      price: e.precio,
    }));
    this.productos = prods;
  },
};
</script>

<style scoped>
.v-tab.withoutupercase {
  text-transform: none !important;
}
.v-tabs {
  width: 50% !important;
}
.v-btn.withoutupercase {
  text-transform: none !important;
}
/*div{
    display:inline-block;
    float:left;
    color:#fff;
    font-size:10px;
  }*/

.three {
  width: 50px;
  height: 50px;
}

.four {
  width: 50px;
  height: 25px;
  background: red;
}
.five {
  width: 50px;
  height: 25px;
  /* background: #042a0f; */
  background: black;
}
.six {
  width: 50px;
  height: 25px;
  background: #2c2107;
}
</style>