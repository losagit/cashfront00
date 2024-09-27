<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <Header/>
    <v-container fluid>
      <router-view />
    </v-container>
    <Footer/>
  </v-app>
</template>

<script>
import Header from "@/components/website/Header.vue";
import Footer from "@/components/website/Footer.vue";

export default {
  name: "ecom",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
    };
  },
};
</script>