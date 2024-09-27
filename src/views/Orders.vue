<template>
  <v-container fluid>
    <v-card flat>
      <v-toolbar flat>
        <v-toolbar-title>Pedidos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>

    <v-card flat class="mt-2">
      <v-data-table dense :headers="headers" :items="records">
        <template v-slot:[`item.direccion`]="{ item }">
          <div>
            <small class="text-Caption">{{
              item.direccion.toUpperCase()
            }}</small
            ><br />
            <small class="grey--text"
              >{{ item.region }} - {{ item.provincia }} -
              {{ item.distrito }}</small
            >
          </div>
        </template>
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip v-if="item.estado == 0" dark small color="red"
            >Pendiente</v-chip
          >
          <v-chip v-else-if="item.estado == 1" dark smal color="success"
            >Enviado</v-chip
          >
          <v-chip v-else dark small color="info">Entregado</v-chip>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <span>{{ formatDate(item.createdAt) }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            :to="{
              name: 'detailorder',
              params: { id: item.id },
            }"
          >
            <v-icon dense>mdi-open-in-new</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { format } from "date-fns";

export default {
  data: () => ({
    drawerForm: false,
    record: {},
    records: [],
    imageUrl: null,
    recordForm: null,
    headers: [
    {
        text: "FECHA",
        value: "createdAt",
      },
      {
        text: "ESTADO",
        value: "estado",
      },
      {
        text: "CLIENTE",
        value: "nombre",
      },
      {
        text: "DIRECCION",
        value: "direccion",
      },
      {
        text: "TOTAL",
        value: "total",
      },
      
      { text: "OPC", value: "actions", sortable: false },
    ],
  }),

  computed: {},

  watch: {},

  methods: {
    async getdata() {
      const data = await this.$store.dispatch("pedidos/list");
      this.records = data;
    },

    formatDate(date) {
      let fd = format(date, "dd/MM/yyyy");
      return fd;
    },
  },
  async created() {
    this.getdata();
  },
};
</script>