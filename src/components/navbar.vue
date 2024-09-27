<template>
  <v-card>
    <v-navigation-drawer dark v-model="drawer" app mini-variant mini-variant-width="100" elevate-on-scroll color="light" class="mt-1 mb-1">
      <v-list>
        <v-list-item-group>
          <v-list-item class="mb-4">
            <v-list-item-content aligin="center">
              <v-icon align="center" x-large>mdi-microsoft-windows</v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-divider ></v-divider>
        <v-list-item-group color="#2EBFAF">
          <v-list-item v-for="item in links" :key="item.name" router :to="item.route">
            <v-list-item-content align="center" >
              <v-icon >{{ item.icon }}</v-icon>
              <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>  
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    props: ["drawer"],
    data() {
      return {
        links: [
          {
            text: "Dashboard",
            icon: "mdi-microsoft-windows",
            route:"dashboard"
          },
          {
            text: "Categorias",
            icon: "mdi-package",
            route:"/categories"
          },
          {
            text: "Pedidos",
            icon: "mdi-invoice-list-outline",
            route:"/orders"
          }
          
        ],
      };
    },
  };
  </script>
  
  <style scoped></style>