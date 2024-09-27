<template>
  <v-navigation-drawer
    v-model="drawer"
    dark
    fixed
    color="transparent"
    mini-variant
    mini-variant-width="110"
  >
  <template v-slot:append>
    <v-card flat class="rounded-xl mx-4 mb-14 py-14">
      <v-list flat>
        <v-list-item-group v-model="selectedItem">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            active-class="border"
            v-slot="{ active }"
            :ripple="false"
            :to="item.route"
          >
            <v-list-item-content>
              <v-icon :color="active ? 'white' : 'grey'" >{{
                item.icon
              }}</v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </template>
  </v-navigation-drawer>
</template>
  
  <script>
export default {
  data: () => ({
    selectedItem: 0,

    items: [
      { icon: "mdi-human-male-female",label:"todos" },
      { icon: "mdi-human-male", label:"caballeros"},
      { icon: "mdi-human-female" },
    ],
  }),
  props: ["drawer"],
  watch: {
    drawer(value) {
      return value;
    },
  },
};
</script>
  
  <style>
.border {
  margin: 0px 8px;
  background: black;
  border-radius: 15px;
  text-decoration: none;
  width: 60px;
  height: 60px;
}
.v-list-item-group .v-list-item--active {
  color: red ;
}
.v-list-item__content {
  padding: 20px 0 ;
}
.image {
  border: 1px solid black;
}
</style>