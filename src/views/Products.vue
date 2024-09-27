<template>
  <v-container fluid>
    <v-card flat>
      <v-toolbar flat>
        <v-toolbar-title>{{ headData.nombre }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn small outlined color="teal" @click="drawerForm = true"
          ><v-icon>mdi-tag-plus</v-icon>nuevo</v-btn
        >
      </v-toolbar>
    </v-card>

    <v-card flat>
      <v-navigation-drawer class="mt-1" app v-model="drawerForm" right>
        <div class="d-flex justify-space-between align-item px-2 py-3">
          <h3>nuevo producto</h3>
          <v-btn icon color="red" @click="drawerForm = false"
            ><v-icon>mdi-close-octagon-outline</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-form class="px-2 py-2">
          <v-text-field v-model="record.nombre" dense outlined label="Nombre" />
          <v-text-field v-model="record.precio" dense outlined label="precio" />
          <v-textarea
            v-model="record.descripcion"
            dense
            outlined
            label="Descripcion"
          ></v-textarea>
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
          </v-row>
          <v-switch
            v-model="record.estado"
            color="success"
            flat
            label="activo"
          ></v-switch>
        </v-form>
        <template v-slot:append>
          <v-footer dark color="teal" class="d-flex justify-end px-2 py-3">
            <v-btn v-if="record.id" small outlined @click="updateRecord"
              >Actualizar</v-btn
            >
            <v-btn v-else small outlined @click="saveRecord">guardar</v-btn>
          </v-footer>
        </template>
      </v-navigation-drawer>
    </v-card>

    <v-card flat class="mt-2">
      <v-data-table dense :headers="headers" :items="records">
        <template v-slot:[`item.stock`]="{ item }">
          <v-chip :color="item.stock < 7 ? 'error' : 'success'">{{
            item.stock
          }}</v-chip>
        </template>
        <template v-slot:[`item.estado`]="{ item }">
          <v-switch color="success" flat :input-value="item.estado" disabled />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="openFormUpdate(item)"> mdi-pencil </v-icon>
          <v-icon small class="mx-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-btn
            icon
            :to="{
              name: 'models',
              params: { id: item.id, categoria_id: headData.id },
            }"
          >
            <v-icon small>mdi-open-in-new</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    drawerForm: false,
    record: {},
    records: [],
    imageUrl:null,
    recordForm: null,
    headers: [
      {
        text: "Nombre",
        value: "nombre",
      },
      {
        text: "Descripcion",
        value: "descripcion",
      },
      {
        text: "Precio (S/.)",
        value: "precio",
      },
      {
        text: "Estado",
        value: "estado",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    headData() {
      const data = this.$store.getters["categorias/getCategoria"];
      return data;
    },
  },

  watch: {},

  methods: {
    async getdata(id) {
      const data = await this.$store.dispatch("productos/list", id);
      this.records = data;
    },

    async saveRecord() {
      let datos = this.record;

      const formData = new FormData();
      formData.append("categoria_id", this.headData.id);
      formData.append("nombre", datos.nombre);
      formData.append("descripcion", datos.descripcion);
      formData.append("precio", datos.precio);
      formData.append("imagen", datos.file);
      formData.append("estado", datos.estado == true ? 1 : 0);

      try {
        let req = await this.$store.dispatch("productos/create", formData);
        this.getdata(this.$route.params.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.drawerForm = false;
        this.record = {};
      }
    },

    async updateRecord(){
      let datos = this.record;

      const formData = new FormData();
      formData.append("categoria_id", this.headData.id);
      formData.append("nombre", datos.nombre);
      formData.append("descripcion", datos.descripcion);
      formData.append("precio", datos.precio);
      if(datos.file != null){
        formData.append("imagen", datos.file);
      }
      formData.append("estado", datos.estado == true ? 1 : 0);

      let data= {
        id: datos.id,
        formData,
      }

      let req = await this.$store.dispatch("productos/update", data);

    },

    openFormUpdate(item) {
      this.drawerForm = true;
      this.recordForm = item;
      this.record = item;
      this.imageUrl = `data:image/jpeg;base64,${this.bytesToBase64(item.imagen.data)}`
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
    let id = this.$route.params.id
      ? this.$route.params.id
      : this.$route.params.categoria_id;

    await this.$store.dispatch("categorias/findById", id);
    this.getdata(id);
  },
};
</script>