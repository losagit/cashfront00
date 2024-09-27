<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card
          height="400"
          class="pa-2 d-flex justify-space-between"
          flat
          color="#f5f5f5f5"
        >
          <div class="ma-2">
            <v-card
              v-for="model in modelos"
              :key="model.id"
              height="70px"
              width="70px"
              class="ma-2"
              @click="onChange(model.img)"
            >
              <v-img :src="model.img" />
            </v-card>
          </div>
          <v-card
            max-width="70%"
            flat
          >
            <img :src="imageShow" width="100%" />
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card height="350" color="transparent" flat>
          <v-row>
            <v-col>
              <span>{{ producto.nombre.toUpperCase() }}</span>
              <v-divider class="my-3"></v-divider>
              <span>S/. {{ producto.precio }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
                <span>Seleccione modelo:</span>
                <div class="d-flex mt-2">
                  <v-card
                    v-for="model in modelos"
                    class="mr-2"
                    :key="model.id"
                    height="50px"
                    width="50px"
                    tile
                    outlined
                    :color="model.id === selectedModelId ? 'orange dark-4' : 'black'"
                    @click="selectModel(model)"
                    :style="model.id === selectedModelId ? 'border: 3px solid;': ''"
                  >
                    <v-img :src="model.img" />
                  </v-card>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn color="black" dark tile outlined @click="addCart()">agregar a carrito</v-btn>
            </v-col>
            <v-col cols="3">
                <span>Detalles</span>
                <v-divider></v-divider>
            </v-col>
            <v-col cols="10">
              <p >{{ producto.descripcion }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels multiple flat v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header color="#f5f5f5"
              >CARACTERISTICAS</v-expansion-panel-header
            >
            <v-expansion-panel-content color="#f5f5f5">
              - Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              necessitatibus architecto porro nostrum perspiciatis? Modi qui
              quod impedit, inventore ad adipisci soluta saepe! Nihil, unde
              quod. Quaerat mollitia harum corporis!
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="my-2">
            <v-expansion-panel-header color="#f5f5f5"
              >SUGERENCIAS</v-expansion-panel-header
            >
            <v-expansion-panel-content color="#f5f5f5">
              - Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
              tempora tempore dicta ipsam temporibus ipsum voluptatibus, ex
              praesentium corporis laborum perspiciatis error sed mollitia quis
              officia obcaecati. Eum, qui consectetur!
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "detail",

  data() {
    return {
      producto: null,
      modelos: [],
      imageShow: null,
      cantidad: 1,
      panel: [0, 1],
      tab: "detalle",
      itemCart: null,
      selectedModelId: null,
    };
  },

  methods: {
    onChange(img) {
      this.imageShow = img;
    },

    selectModel(model){
      const item = {
        id: model.id,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        imagen: model.img,
        color: model.color
      }

      this.itemCart = item;
      this.imageShow = model.img;
      this.selectedModelId = model.id;
    },

    addCart(){
      this.$store.commit('pedidos/add_cart',this.itemCart);
      
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

  async created() {
    const data = await this.$store.dispatch(
      "productos/findById",
      this.$route.params.id
    );
    const models = await this.$store.dispatch(
      "modelos/list",
      this.$route.params.id
    );
    this.producto = data;
    this.modelos = models.map((e) => ({
      id: e.id,
      img: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
      color: e.color,
      talla: e.talla,
    }));
    this.imageShow = this.modelos[0].img;
  },
};
</script>

<style>

</style>