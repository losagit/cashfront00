<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-row class="mx-3" justify="end">
          <v-col cols="3">
            <v-card-title>Pedido n°</v-card-title>
            <v-text-field dense outlined filled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-card width="100%">
                <v-card-title>Detalles del pedido</v-card-title>
                <v-divide></v-divide>
            </v-card>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Datos del cliente</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "detailorder",

  data() {
    return {};
  },

  methods: {},

  created() {},
};
</script>