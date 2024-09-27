<template>
  <v-container fluid>
    <v-card flat>
      <v-toolbar flat>
        <v-toolbar-title>categorias</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
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
          <v-row>
            <v-col>
              <v-text-field
                v-model="record.nombre"
                dense
                outlined
                label="Nombre"
              />
              <v-switch
                v-model="record.estado"
                label="activo"
                color="success"
              />
            </v-col>
          </v-row>
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
          <div class="d-flex justify-space-between">
            <v-card-subtitle>{{ item.nombre }}</v-card-subtitle>
            <v-btn
              icon
              class="mt-3 mr-3"
              :to="{
                name: 'products',
                params: { id: item.id},
              }"
            >
              <v-icon>mdi-open-in-new</v-icon></v-btn
            >
          </div>
          <v-divider></v-divider>
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
  name: "Categorias",
  data: () => ({
    drawerForm: false,
    records: null,
    record: {},
  }),

  computed: {},

  watch: {},

  methods: {
    //Obtener datos
    async getdata() {
      const data = await this.$store.dispatch("categorias/list");
      this.records = data;
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
      let datos = {
        nombre: this.record.nombre,
        estado: this.record.estado
      };
      
      try {
        let req = await this.$store.dispatch("categorias/create", datos);
        this.getdata();
      } catch (error) {
        console.log(error);
      } finally {
        this.closeForm();
        this.record = {};
      }
    },

    async updateRecord() {
      let datos = {
        id: this.record.id,
        body: {
          nombre: this.record.nombre,
          estado: this.record.estado,
        },
      };

      try {
        let req = await this.$store.dispatch("categorias/update", datos);
        this.getdata();
      } catch (error) {
        console.log(error);
      } finally {
        this.closeForm();
        this.record = {};
      }
    },
  },

  async created() {
    this.getdata();
  },
};
</script>