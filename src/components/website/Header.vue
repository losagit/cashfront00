<template>
  <v-container>
    <v-app-bar flat app>
      <v-avatar height="60px" width="130px" tile>
        <img src="@/assets/logo2.png" alt="" />
      </v-avatar>
      <v-spacer></v-spacer>
      <v-text-field class="mt-7" dense outlined rounded placeholder="buscar..." append-icon="mdi-magnify">
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click="showCart">
        <v-icon> mdi-cart </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      width="300"
      color="#f5f5f5f5"
      app
      v-model="drawerForm"
      right
    >
      <div class="d-flex justify-space-between align-item px-2 py-3">
        <span>carrito</span>
        <v-btn icon color="red" @click="drawerForm = false"
          ><v-icon>mdi-close-octagon-outline</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <v-card
        height="100px"
        flat
        color="transparent"
        v-for="item in cart"
        :key="item.nombre"
      >
        <div class="d-flex justify-space-between">
          <v-avatar class="ma-3" size="70" tile>
            <v-img :src="item.imagen"></v-img>
          </v-avatar>
          <div>
            <v-card-subtitle>
              <div class="d-flex justify-space-between">
                <small>{{ item.nombre }} {{ item.color }}</small>
                <v-btn icon><v-icon>mdi-trash-can-outline</v-icon></v-btn>
              </div>
              <div class="d-flex justify-space-between">
                <small>{{ item.precio }}</small>
              </div>
            </v-card-subtitle>
          </div>
        </div>
      </v-card>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-footer>
          <v-btn color="black" dark tile class="col-12" :to="{ name: 'order' }"
            >realizar pedido
            </v-btn>
        </v-footer>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawerForm: false,
      cart: [],
    };
  },

  methods: {
    async getData() {
      const data = await this.$store.getters["pedidos/getCart"];
      this.cart = data.map((e) => ({
        imagen: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
        ...e,
      }));
    },
    showCart() {
      this.getData();
      this.drawerForm = true;
    },
    bytesToBase64(bytes) {
      return btoa(
        new Uint8Array(bytes).reduce(
          (datos, byte) => datos + String.fromCharCode(byte),
          ""
        )
      );
    },
  },

  created() {
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  border-bottom: 2px solid #f8f8f8;
}
nav .nav-inner {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: calc(1440px - 170px);
  width: 100%;
  margin: auto;
}
.nav-inner .links a {
  margin: 0px 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: #121212;
  border-bottom: 1px solid transparent;
  transition: 0.3s;
}
.nav-inner .links a:hover {
  border-color: #121212;
}

.icons {
  display: flex;
  align-items: center;
}
.icons span {
  margin: 0 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  padding-top: 7%;
  padding-bottom: 7%;
}
</style>


