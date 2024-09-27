<template>
  <v-container fluid>
    <v-card flat>
      <v-toolbar flat>
        <v-btn
          small
          outlined
          color="warning"
          :to="{
            name: 'products',
            params: { id: params.categoria_id },
          }"
          ><v-icon>mdi-clipboard-arrow-left-outline</v-icon></v-btn
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-toolbar-title>{{ headData.nombre }}</v-toolbar-title>
        <v-toolbar-title>{{ headData.descripcion }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small outlined color="teal" @click="drawerForm = true"
          ><v-icon>mdi-package-variant-plus</v-icon></v-btn
        >
      </v-toolbar>
    </v-card>
    <v-card flat>
      <v-navigation-drawer class="mt-1" app v-model="drawerForm" right>
        <div class="d-flex justify-space-between align-item px-2 py-3">
          <span>nueva categoria</span>
          <v-btn icon color="red" @click="closeForm()"
            ><v-icon>mdi-close-octagon-outline</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-form class="px-2 py-2">
          <v-form>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  label="color(es)"
                  v-model="record.color"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  label="talla"
                  v-model="record.talla"
                />
              </v-col>
              <v-row dense>
                <v-col cols="12">
                  <v-file-input
                    dense
                    outlined
                    label="Foto"
                    prepend-icon="mdi-camera"
                    small-chips
                    v-model="record.file"
                    @change="onFileChange"
                  ></v-file-input>
                  <v-img
                    v-if="imageUrl"
                    :src="imageUrl"
                    max-width="150"
                    class="mt-4"
                  ></v-img>
                </v-col>
                <v-switch
                  v-model="record.estado"
                  color="success"
                  flat
                  label="activo"
                ></v-switch>
              </v-row>
            </v-row>
          </v-form>
        </v-form>

        <template v-slot:append>
          <v-divider></v-divider>
          <v-footer dark color="teal" class="d-flex justify-end px-2 py-3">
            <v-btn v-if="record.id" small outlined @click="updateRecord"
              >Actualizar</v-btn
            >
            <v-btn v-else small outlined @click="saveRecord">Guardar</v-btn>
          </v-footer>
        </template>
      </v-navigation-drawer>
    </v-card>

    <v-row class="mt-1">
      <v-col cols="2" v-for="item in records" :key="item.nombre">
        <v-card>
          <v-img height="150" :src="item.img" class="pa-2"></v-img>

          <v-card-text>
            <v-row>
              <div class="grey--text ms-4">Color: {{ item.color }}</div>
            </v-row>
            <v-row>
              <div class="grey--text ms-4">Talla: {{ item.talla }}</div>
            </v-row>
          </v-card-text>

          <v-card-actions class="d-flex justify-end">
            <v-btn icon @click="openFormUpdate(item)">
              <v-icon>mdi-circle-edit-outline</v-icon></v-btn
            >
            <v-btn icon> <v-icon>mdi-delete-circle-outline</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
    
<script>
export default {
  name: "Modelos",
  data: () => ({
    id:null,
    records: null,
    record: {},

    drawerForm: false,

    file: null,
    imageUrl: null,
  }),

  computed: {
    headData() {
      const data = this.$store.getters["productos/getProducto"];
      return data;
    },
  },

  watch: {},

  methods: {
    //Obtener datos
    async getdata(id) {
      const data = await this.$store.dispatch("modelos/list", id);
      const mods = data.map((e) => ({
        img: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
        ...e,
      }));

      this.records = mods;
    },

    //Utils
    openFormUpdate(item) {
      this.drawerForm = true;
      this.record.id = item.id;
      this.record.nombre = item.nombre;
      this.record.estado = item.estado;
    },

    closeForm() {
      this.drawerForm = false;
      this.record = {};
    },

    //Request
    async saveRecord() {
      let datos = this.record;

      const formData = new FormData();
      formData.append("producto_id", this.params.id);
      formData.append("imagen", datos.file);
      formData.append("color", datos.color);
      formData.append("talla", datos.talla);
      formData.append("estado", datos.estado == true ? 1 : 0);

      try {
        let req = await this.$store.dispatch("modelos/create", formData);
        this.getdata(this.params.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.closeForm();
        this.record = {};
      }
    },

    bytesToBase64(bytes) {
      return btoa(
        new Uint8Array(bytes).reduce(
          (datos, byte) => datos + String.fromCharCode(byte),
          ""
        )
      );
    },

    onFileChange(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageUrl = null;
      }
    },
  },

  async created() {
    this.params = this.$route.params;
    await this.$store.dispatch("productos/findById", this.params.id);
    this.getdata(this.params.id);
  },
};
</script>