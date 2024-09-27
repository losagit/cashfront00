<template>
  <v-row>
    <v-col cols="7">
      <v-card color="#f5f5f5" height="450" flat>
        <v-card-title>Datos de cliente</v-card-title>
        <v-divider inset></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="2">
              <v-select
              v-model="cliente.tipodocumento"
                dense
                outlined
                :items="documentos"
                label="Tipo"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="cliente.numdocumento" dense label="DNI" outlined />
            </v-col>
            <v-col cols="7">
              <v-text-field v-model="cliente.nombre" dense label="nombre y apellido" outlined />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="cliente.region" dense label="Region" outlined />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="cliente.provincia" dense label="provincia" outlined />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="cliente.distrito" dense label="distrito" outlined />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="cliente.direccion" dense label="Direccion de entrega" outlined />
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="cliente.celular" dense label="Celular" outlined />
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="cliente.nwhatsapp" dense label="Whatsapp" outlined />
            </v-col>
            <v-col cols="12">
              <v-textarea
              v-model="cliente.referencia"
                height="80"
                dense
                label="Referencia de entrega"
                outlined
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-card color="#f5f5f5" height="450" flat>
        <v-card-title>Resumen de orden</v-card-title>
        <v-divider inset></v-divider>
        <v-card
          flat
          color="transparent"
          v-for="item in cart"
          :key="item.nombre"
          class="d-flex ma-2"
        >
          <v-row>
            <v-col cols="2">
              <v-avatar class="" size="70" tile>
                <v-img :src="item.imagen" width="100%"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="5">
              <h5>{{ item.nombre.toUpperCase() }}</h5>
              <h6>{{ item.color }}</h6>
            </v-col>
            <v-col cols="5">
              <div class="d-flex">
                <v-text-field  type="number" dense outlined :value="item.cantidad"/>
                <div class="d-flex">
                  <v-card-subtitle class="mx-4 px-2">S/.{{ item.precio }}</v-card-subtitle>
                  <v-btn icon class="mt-3">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-divider inset class="my-2"></v-divider>
        <v-row>
          <v-col cols="9" class="d-flex justify-end">
            <span>Subtotal: </span>
          </v-col>
          <v-col cols="3">
            <span>S/. {{ subtotal }}.00</span>
          </v-col>
          <v-col cols="9" class="d-flex justify-end">
            <span>Costo de envio: </span>
          </v-col>
          <v-col cols="3">
            <span>S/. {{ envio }}.00</span>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="9" class="d-flex justify-end">
            <span>Total: </span>
          </v-col>
          <v-col cols="3">
            <span>S/. {{ total }}.00</span>
          </v-col>
        </v-row>
        <div class="d-flex justify-end my-2 px-2">
          <v-btn outlined color="black" tile @click="saveOrder"> confirmar pedido</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      documentos: ["DNI", "RUC", "C.E"],
      cliente: {},
      subtotal: null,
      envio: 5,
      total: null,
    };
  },
  methods: {
    async getData() {
      const data = await this.$store.getters["pedidos/getCart"];
      this.cart = data.map((e) => ({
        imagen: `data:image/jpeg;base64,${this.bytesToBase64(e.imagen.data)}`,
        cantidad:1,
        ...e,
      }));

      this.subtotal = data.reduce(
        (sum, item) => sum + parseInt(item.precio),
        0
      );
      this.total = this.subtotal + this.envio;
    },
    bytesToBase64(bytes) {
      return btoa(
        new Uint8Array(bytes).reduce(
          (datos, byte) => datos + String.fromCharCode(byte),
          ""
        )
      );
    },

    async saveOrder(){

      const cliente = this.cliente;
      const cart = this.cart;

      let detalles = cart.map((e) => ({
        modelo_id: e.id,
        umd:"unidad",
        cantidad: e.cantidad,
        precio: e.precio,
      }))

      const data = {
        subtotal: this.subtotal,
        envio: this.envio,
        total: this.total,
        detalles: detalles
      }

      const result = await this.$store.dispatch('clientes/create',cliente);
      const cliente_id = result.insertId;
      if(result?.insertId){
        data.cliente_id = cliente_id;
        const result = await this.$store.dispatch('pedidos/create',data);
        if(result?.insertId){
          alert("pedido registrado");
          this.$router.push(
            {
              name:"catalogue"
            }
          )
        }
      }
    }
  },
  created() {
    this.getData();
  },
};
</script>